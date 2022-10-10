import checkResponse, {
	ADD_CONTACT_REQUEST,
	ADD_CONTACT_SUCCESS,
	ADD_CONTACT_ERROR,
	DELETE_CONTACT_REQUEST,
	DELETE_CONTACT_SUCCESS,
	DELETE_CONTACT_ERROR,
	GET_ALL_CONTACTS_REQUEST,
	GET_ALL_CONTACTS_SUCCESS,
	GET_ALL_CONTACTS_ERROR,
	EDIT_CONTACT_REQUEST,
	EDIT_CONTACT_SUCCESS,
	EDIT_CONTACT_ERROR,

} from ".";
import { DataType } from "../../utils/types";
import { AppDispatch, AppThunk } from "../reducers/root-reducer";

//GET ALL CONTACTS
export type TgetAllContactsReq = {
	readonly type: typeof GET_ALL_CONTACTS_REQUEST;
}

export type TgetAllContactsSucc = {
	readonly type: typeof GET_ALL_CONTACTS_SUCCESS;
	readonly allContacts: DataType[]
}

export type TgetAllContactsError = {
	readonly type: typeof GET_ALL_CONTACTS_ERROR;
}

export function getAllContactsReq(): TgetAllContactsReq {
	return {
		type: GET_ALL_CONTACTS_REQUEST
	}
}

export function getAllContactsSucc(res: Array<DataType>): TgetAllContactsSucc {
	return {
		type: GET_ALL_CONTACTS_SUCCESS,
		allContacts: res
	}
}

export function getAllContactsError(): TgetAllContactsError {
	return {
		type: GET_ALL_CONTACTS_ERROR
	}
}

export const getAllContactsRequest = () => {
	return fetch(`${'http://localhost:3000/contacts'}`)
		.then(checkResponse)
		.then(data => {
			return data;
		})
};

export const getAllContacts = () => (dispatch: AppDispatch) => {
	dispatch(getAllContactsReq());
	getAllContactsRequest()
		.then(res => {
			if (res) {
				dispatch(getAllContactsSucc(res));
			}
		}).catch(err => {
			dispatch(getAllContactsError());
		})
}

//ADD CONTACT
export type TaddContactReq = {
	readonly type: typeof ADD_CONTACT_REQUEST;
}

export type TaddContactSucc = {
	readonly type: typeof ADD_CONTACT_SUCCESS;
	readonly contact: DataType;
}

export type TaddContactError = {
	readonly type: typeof ADD_CONTACT_ERROR;
}

export function addContactReq(): TaddContactReq {
	return {
		type: ADD_CONTACT_REQUEST
	}
}

export function addContactSucc(form: DataType): TaddContactSucc {
	return {
		type: ADD_CONTACT_SUCCESS,
		contact: form
	}
}

export function addContactError(): TaddContactError {
	return {
		type: ADD_CONTACT_ERROR
	}
}

export function addContactRequest(form: DataType) {
	return fetch(`${'http://localhost:3000/contacts'}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(form)
	})
		.then(checkResponse)
		.then(data => {
			return data;
		})
};

export const addContact: AppThunk = (form: DataType) => (dispatch: AppDispatch) => {
	dispatch(addContactReq());
	addContactRequest(form)
		.then(res => {
			if (res) {
				dispatch(addContactSucc(res));
			}
		}).catch(err => {
			dispatch(addContactError());
		})
}

//DELETE CONTACT
export type TdeleteContactReq = {
	readonly type: typeof DELETE_CONTACT_REQUEST;
}

export type TdeleteContactSucc = {
	readonly type: typeof DELETE_CONTACT_SUCCESS;
	readonly contact: DataType;
}

export type TdeleteContactError = {
	readonly type: typeof DELETE_CONTACT_ERROR;
}

export function deleteContactReq(): TdeleteContactReq {
	return {
		type: DELETE_CONTACT_REQUEST,
	}
}

export function deleteContactSucc(contact: DataType): TdeleteContactSucc {
	return {
		type: DELETE_CONTACT_SUCCESS,
		contact
	}
}

export function deleteContactError(): TdeleteContactError {
	return {
		type: DELETE_CONTACT_ERROR
	}
}

export function deleteContactRequest(contact: DataType) {
	return fetch(`http://localhost:3000/contacts/${contact}`, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		},
	})
		.then(checkResponse)
		.then(data => {
			return data;
		})
};

export const deleteContact: AppThunk = (contact: DataType) => (dispatch: AppDispatch) => {
	dispatch(deleteContactReq());
	deleteContactRequest(contact)
		.then(res => {
			dispatch(deleteContactSucc(res));
			dispatch(getAllContacts());
		}).catch(err => {
			dispatch(addContactError());
		})
}

//EDIT CONTACT
export type TeditContactReq = {
	readonly type: typeof EDIT_CONTACT_REQUEST;
}

export type TeditContactSucc = {
	readonly type: typeof EDIT_CONTACT_SUCCESS;
	readonly contact: DataType;
}

export type TeditContactError = {
	readonly type: typeof EDIT_CONTACT_ERROR;
}

export function editContactReq(): TeditContactReq {
	return {
		type: EDIT_CONTACT_REQUEST
	}
}

export function editContactSucc(contact: DataType): TeditContactSucc {
	return {
		type: EDIT_CONTACT_SUCCESS,
		contact
	}
}

export function editContactError(): TeditContactError {
	return {
		type: EDIT_CONTACT_ERROR
	}
}

export const editContactRequest = (contact: DataType) => {
	return fetch(`http://localhost:3000/contacts/${contact.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(contact),
	})
		.then(checkResponse)
		.then(data => {
			return data;
		})
};

export const editContact: AppThunk = (contact: DataType) => (dispatch: AppDispatch) => {
	dispatch(editContactReq())
	editContactRequest(contact)
		.then(res => {
			if (res) {
				dispatch(editContactSucc(res));
			}
		}).catch(err => {
			dispatch(editContactError());
		})
}

export type TContactActions = TaddContactReq | TaddContactSucc | TaddContactError | TdeleteContactReq | TdeleteContactSucc | TdeleteContactError | TgetAllContactsReq | TgetAllContactsSucc | TgetAllContactsError | TeditContactReq | TeditContactSucc | TeditContactError;