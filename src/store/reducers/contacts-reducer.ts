import {
	GET_ALL_CONTACTS_REQUEST,
	GET_ALL_CONTACTS_SUCCESS,
	GET_ALL_CONTACTS_ERROR,
	ADD_CONTACT_REQUEST,
	ADD_CONTACT_SUCCESS,
	ADD_CONTACT_ERROR,
	EDIT_CONTACT_REQUEST,
	EDIT_CONTACT_SUCCESS,
	EDIT_CONTACT_ERROR,
	DELETE_CONTACT_REQUEST,
	DELETE_CONTACT_SUCCESS,
	DELETE_CONTACT_ERROR,
} from "../actions";
import { DataType } from "../../utils/types";
import { TContactActions, } from "../actions/contacts";

export type TContactState = {
	allContacts: DataType[],
	allContactsRequest: boolean;
	allContactsSuccess: boolean;
	allContactsError: boolean;

	addContactRequest: boolean;
	addContactSuccess: boolean;
	addContactError: boolean;

	editContactRequest: boolean;
	editContactSuccess: boolean;
	editContactError: boolean;

	deleteContactRequest: boolean;
	deleteContactSuccess: boolean;
	deleteContactError: boolean;
}

export const initialState: TContactState = {
	allContacts: [],
	allContactsRequest: false,
	allContactsSuccess: false,
	allContactsError: false,

	addContactRequest: false,
	addContactSuccess: false,
	addContactError: false,

	editContactSuccess: false,
	editContactRequest: false,
	editContactError: false,

	deleteContactRequest: false,
	deleteContactSuccess: false,
	deleteContactError: false,
};

export const contactsReducer = (state = initialState, action: TContactActions): TContactState => {
	switch (action.type) {
		case GET_ALL_CONTACTS_REQUEST:
			{
				return {
					...state,
					allContactsRequest: true,
				}
			}
		case GET_ALL_CONTACTS_SUCCESS:
			{
				return {
					...state,
					allContactsSuccess: true,
					allContacts: [...action.allContacts],
				}
			}
		case GET_ALL_CONTACTS_ERROR:
			{
				return {
					...state,
					allContactsError: true,
				};
			}
		case ADD_CONTACT_REQUEST:
			{
				return {
					...state,
					addContactRequest: true,
				}
			}
		case ADD_CONTACT_SUCCESS:
			{
				return {
					...state,
					addContactSuccess: true,
					allContacts: [...state.allContacts, action.contact],
				}
			}
		case ADD_CONTACT_ERROR:
			{
				return {
					...state,
					addContactError: true,
				};
			}
		case EDIT_CONTACT_REQUEST:
			{
				return {
					...state,
					editContactRequest: true,
				};
			}
		case EDIT_CONTACT_SUCCESS:
			{
				const newState = [...state.allContacts];

				for (let i = 0; i < newState.length; i++) {
					const index = newState.findIndex(item => action.contact.id === item.id);
					const item = newState[index];
					newState.splice(index, 1, item);
					return {
						...state,
						allContacts: [...newState],
						editContactSuccess: true,
					}
				}
			}
		// falls through	
		case EDIT_CONTACT_ERROR:
			{
				return {
					...state,
					editContactError: true,
				};
			}
		case DELETE_CONTACT_REQUEST:
			{
				return {
					...state,
					deleteContactRequest: true,
				}
			}

		case DELETE_CONTACT_SUCCESS:
			{
				const newState = [...state.allContacts];
				const deleteElement = action.contact.id;

				for (let i = 0; i < newState.length; i++) {
					if (newState[i].id === deleteElement) {
						const newAllContacts = newState.filter((item) => item.id !== newState[i].id)
						return {
							...state,
							allContacts: [...newAllContacts],
							deleteContactSuccess: true,
						}
					}
				}
			}
		// falls through
		case DELETE_CONTACT_ERROR:
			{
				return {
					...state,
					deleteContactError: true,
				};
			}
		default:
			return state
	}
}