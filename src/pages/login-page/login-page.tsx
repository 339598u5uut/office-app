import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import style from './login-page-style.module.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from '../../store/reducers/root-reducer';
import { login } from '../../store/actions/user';
import { TForm } from '../../utils/types';

export const LoginPage: React.FC = () => {

	const dispatch = useDispatch();
	const loginSuccess = useSelector((state) => state.user.loginSuccess);
	const [form, setValue] = useState<TForm>({ "username": '', "password": '' });

	const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const userLogin = (e: React.SyntheticEvent) => {
		e.preventDefault();
		dispatch(login(form));
	}

	if (loginSuccess === true) {
		return (
			<Redirect
				to={{
					pathname: '/contacts'
				}}
			/>
		);
	};

	return (
		<main className={style.main}>
			<div className={style.container}>
				<h1 className={style.header}>Login to your personal account</h1>
				<Form
					name="normal_login"
					className="login-form"
					initialValues={{ remember: true }}
				>
					<Form.Item
						name="username"
						rules={[{ required: true, message: 'Please input your Username!' }]}
					>
						<Input
							prefix={<UserOutlined className="site-form-item-icon" />}
							name="username"
							value={form.username}
							onChange={onChange}
							placeholder="Username" />
					</Form.Item>

					<Form.Item
						name="password"
						rules={[{ required: true, message: 'Please input your Password!' }]}
					>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							name="password"
							value={form.password}
							onChange={onChange}
							placeholder="Password"
							style={{ marginBottom: 10 }}
						/>
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							onClick={userLogin}
							className="login-form-button"
							style={{
								width: '60%'
							}}>
							Log in
						</Button>
					</Form.Item>

				</Form>
			</div>
		</main>
	);
};