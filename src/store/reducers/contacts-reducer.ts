import {
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
	EDIT_CONTACT_ERROR
} from "../actions";
import { DataType } from "../../utils/types";
import { TContactActions, } from "../actions/contacts";

export type TContactState = {
	contacts: DataType[];
	contactsSuccess: boolean;
	contactsRequest: boolean;
	contactsError: boolean;

	allContacts: DataType[],
	allContactsRequest: boolean;
	allContactsSuccess: boolean;
	allContactsError: boolean;

	editContactsSuccess: boolean;
	editContactsRequest: boolean;
	editContactsError: boolean;
}

export const initialState: TContactState = {
	contacts: [],
	contactsRequest: false,
	contactsSuccess: false,
	contactsError: false,

	allContacts: [],
	allContactsRequest: false,
	allContactsSuccess: false,
	allContactsError: false,

	editContactsSuccess: false,
	editContactsRequest: false,
	editContactsError: false,
};

export const contactsReducer = (state = initialState, action: TContactActions): TContactState => {
	switch (action.type) {
		case GET_ALL_CONTACTS_REQUEST:
			{
				return {
					...state,
					contactsRequest: true,
				}
			}
		case GET_ALL_CONTACTS_SUCCESS:
			{
				return {
					...state,
					contactsRequest: false,
					contactsSuccess: true,
					contactsError: false,
					allContacts: [...action.allContacts],
				}
			}
		case GET_ALL_CONTACTS_ERROR:
			{
				return {
					...state,
					contactsRequest: false,
					contactsError: true,
				};
			}
		case ADD_CONTACT_REQUEST:
			{
				return {
					...state,
					contactsRequest: true,
				}
			}
		case ADD_CONTACT_SUCCESS:
			{
				return {
					...state,
					contactsRequest: false,
					contactsSuccess: true,
					contactsError: false,
					contacts: [...state.contacts, action.contact],
				}
			}
		case ADD_CONTACT_ERROR:
			{
				return {
					...state,
					contactsRequest: false,
					contactsError: true,
				};
			}
		case EDIT_CONTACT_REQUEST:
			{
				return {
					...state,
					editContactsRequest: true,
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
						editContactsSuccess: true,
						editContactsRequest: false,
						editContactsError: false,
					}
				}
			}
		// falls through	
		case EDIT_CONTACT_ERROR:
			{
				return {
					...state,
					editContactsRequest: false,
					editContactsError: true,
				};
			}
		case DELETE_CONTACT_REQUEST:
			{
				return {
					...state,
					contactsRequest: true,
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
							allContacts: [...newAllContacts]
						}
					}
				}
			}
		// falls through
		case DELETE_CONTACT_ERROR:
			{
				return {
					...state,
					contactsRequest: false,
					contactsError: true,
				};
			}
		default:
			return state
	}
}