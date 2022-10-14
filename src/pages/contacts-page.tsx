import React, { FC, useEffect, useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, LogoutOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { InputRef, Popconfirm, Button, Input, Space, Table, Form, Typography, Modal } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from '../store/reducers/root-reducer';
import { Redirect } from 'react-router-dom';
import { getAllContacts, deleteContact, addContact } from '../store/actions/contacts';
import { logout } from '../store/actions/user';
import { editContact } from '../store/actions/contacts';
import { EditableCell } from '../components/editable-cell';
import { DataType, DataIndex, TFormContacts } from '../utils/types';

export const ContactsPage: FC = () => {

	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef<InputRef>(null);
	const [form] = Form.useForm();

	useEffect(() => {
		dispatch(getAllContacts());
	}, []);

	const data = useSelector((state) => state.contacts.allContacts);
	const [dataEdit, setData] = useState(data);
	const logoutSuccess = useSelector((state) => state.user.logoutSuccess);
	const [editingKey, setEditingKey] = useState('');
	const isEditing = (record: DataType) => record?.id === editingKey;

	const edit = (record: Partial<DataType> & { id: string }) => {
		form.setFieldsValue({ name: '', contact: '', address: '', ...record });
		setEditingKey(record.id);
	};

	const save = async (id: string) => {
		const row = (await form.validateFields()) as DataType;
		row.id = id;
		dispatch(editContact(row));
		setEditingKey('');
		setData(data);
	};

	const handleDelete = async (id: string) => {
		const row = (await form.validateFields()) as DataType;
		row.id = id;
		dispatch(deleteContact(id));
		setData(data);
	};

	useEffect(() => {
		dispatch(getAllContacts());
	}, [dispatch, dataEdit]);

	const [formModal, setValue] = useState<TFormContacts>({ "name": '', "contact": '', "address": '', "id": '' });

	const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setValue({ ...formModal, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		formModal.name = '';
		formModal.contact = '';
		formModal.address = '';
	}

	const handleOkModal = () => {
		dispatch(addContact(formModal));
		setOpen(false);
		resetForm();
	};

	const handleCancelModal = () => {
		setOpen(false);
		resetForm();
	};

	const handleSearch = (
		selectedKeys: string[],
		confirm: (param?: FilterConfirmProps) => void,
		dataIndex: DataIndex,
	) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters: () => void) => {
		clearFilters();
		setSearchText('');
	};

	const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							setSearchText((selectedKeys as string[])[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownOpenChange: visible => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: text =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	});


	const columns: ColumnsType<DataType> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: '30%',
			editable: true,
			...getColumnSearchProps('name'),
		},
		{
			title: 'Contact',
			dataIndex: 'contact',
			key: 'contact',
			width: '30%',
			editable: true,
			...getColumnSearchProps('contact'),
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
			width: '30%',
			editable: true,
			...getColumnSearchProps('address'),
			sorter: (a: DataType, b: DataType) => a.address.length - b.address.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Action',
			key: 'action',
			render: (record: DataType) => {
				const editable = isEditing(record);
				return editable ? (
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<span >
							<Typography.Link style={{ color: 'rgba(229, 81, 55, 0.8)' }}
								onClick={() => save(record.id)}
							>
								Save
							</Typography.Link>
						</span>
						<Popconfirm
							title="Sure to delete?"
							onConfirm={() => handleDelete(record.id)}>
							<Button icon={<DeleteOutlined />}
							/>
						</Popconfirm>
					</div>
				)
					: (
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<Button icon={<EditOutlined />}
								onClick={() => edit(record)}>
							</Button>

							<span style={{ visibility: 'hidden' }}>
								<Typography.Link
									style={{ color: 'rgba(229, 81, 55, 0.8)' }}
									onClick={() => save(record.id)}
									disabled={editingKey !== ''}>
									Save
								</Typography.Link>
							</span>

							<Popconfirm
								title="Sure to delete?"
								onConfirm={() => handleDelete(record.id)}>
								<Button icon={<DeleteOutlined />}
								/>
							</Popconfirm>
						</div>
					)
			}
		},
	];


	const mergedColumns = columns.map(col => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record: DataType) => ({
				record,
				inputType: col.dataIndex === 'contact' ? 'number' : 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: (isEditing(record)),
			}),
		};
	});

	if (logoutSuccess === true) {
		return (
			<Redirect
				to={{
					pathname: '/'
				}}
			/>
		);
	};


	return (

		<main style={{ padding: '40px', paddingTop: '70px' }}>
			<h1 style={{ display: 'inline' }}>My personal account</h1>
			<Button
				style={{ float: 'right', marginBottom: '15px', border: '1px solid rgba(229, 81, 55,0.8)' }}
				icon={<LogoutOutlined />}
				onClick={() => {
					dispatch(logout("", ""));
				}}
			>Logout
			</Button>

			<Button
				type="primary"
				style={{ marginBottom: '15px', marginRight: '50px', float: 'right', backgroundColor: 'rgba(229, 81, 55,0.8)', border: '1px solid rgba(229, 81, 55,0.8)', color: 'white' }}
				icon={<UserAddOutlined />}
				onClick={() => setOpen(true)}>Add
			</Button>

			<Modal
				title="Add contact:"
				open={open}
				onOk={handleOkModal}
				onCancel={handleCancelModal}
			>
				<form action="#">
					<Input
						placeholder="name"
						name="name"
						value={formModal.name}
						onChange={onChange}
						style={{ marginBottom: 30 }} />

					<Input
						placeholder="contacts"
						name="contact"
						value={formModal.contact}
						onChange={onChange}
						style={{ marginBottom: 30 }} />

					<Input
						placeholder="address"
						name="address"
						value={formModal.address}
						onChange={onChange} />
				</form>
			</Modal>


			<Form form={form} component={false} >
				<Table
					dataSource={data}
					rowKey='id'
					components={{
						body: {
							cell: EditableCell,
						},
					}}
					bordered
					columns={mergedColumns}
					rowClassName="editable-row"
				/>
			</Form>
		</main >
	)
};
