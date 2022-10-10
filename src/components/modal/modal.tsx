import React, { FC } from 'react';
import style from './modal-style.module.css';
import ReactDOM from 'react-dom';
import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const modalRoot = document.getElementById("react-modals") as HTMLElement;

export type TModal = {
	title: string;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: FC<TModal> = ({ children, title, onClose }) => {

	return (
		ReactDOM.createPortal(
			<div className={style.wrapper}>
				<form className={style.container}>
					<h2 style={{ color: 'white', marginBottom: 20 }}>{title} </h2>
					<Button
						htmlType="button"
						size="small"
						type='ghost'
						onClick={onClose}
						icon={<CloseOutlined />}
						style={{ position: 'absolute', top: 40, right: 40, padding: 0 }} />
					{children}
				</form>
			</div>
			,
			modalRoot
		))
}

export default Modal;