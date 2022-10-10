export type DataType = {
	id: string,
	name: string;
	contact: number;
	address: string;
}
export type DataIndex = keyof DataType;

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: string;
	title: string;
	inputType: 'number' | 'text';
	record: DataType;
	index: number;
	children: React.ReactNode;
}

export type TFormContacts = {
	id: string;
	name: string;
	contact: number | string;
	address: string;
}

export type TForm = {
	username: string;
	password: string;
}