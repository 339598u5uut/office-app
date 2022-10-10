import { ActionCreator, combineReducers } from 'redux';
import { userReducer } from './user-reducer';
import {
    TypedUseSelectorHook, useSelector as selectorHook,
    useDispatch as dispatchHook
} from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TUserActions } from '../actions/user';
import { store } from '../..';
import { contactsReducer } from './contacts-reducer';
import { TContactActions } from '../actions/contacts';

export const rootReducer = combineReducers({
    user: userReducer,
    contacts: contactsReducer,
});

export type TAllActions = TUserActions | TContactActions;
export type TApplicationActions = TAllActions;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn,
        RootState,
        never,
        TApplicationActions>
>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch>();
