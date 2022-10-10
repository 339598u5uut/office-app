import React, { FC, useState } from 'react';
import { Button, Input } from 'antd';
import { useDispatch } from '../store/reducers/root-reducer';
import { addContact } from '../store/actions/contacts';
import { TFormContacts } from '../utils/types';

const FormAddContact: FC<TFormContacts> = () => {

	const dispatch = useDispatch();
	const [form, setValue] = useState<TFormContacts>({ "name": '', "contact": '', "address": '', "id": '' });

	const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const contactAdd = (e: React.SyntheticEvent) => {
		e.preventDefault();
		dispatch(addContact(form));
	}

	return (
		<>
			<Input
				placeholder="Type Name"
				name="name"
				value={form.name}
				onChange={onChange}
				style={{ marginBottom: 40 }} />

			<Input
				placeholder="Type contacts"
				name="contact"
				value={form.contact}
				onChange={onChange}
				style={{ marginBottom: 40 }} />

			<Input
				placeholder="Type address"
				name="address"
				value={form.address}
				onChange={onChange}
				style={{ marginBottom: 40 }} />

			<Button
				onClick={contactAdd}
				style={{
					width: '60%', background: 'rgba(229, 81, 55,0.8)', color: 'white'
				}}>Add
			</Button>
		</>

	)
}
export default FormAddContact;