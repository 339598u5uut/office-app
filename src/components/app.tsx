import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ContactsPage } from '../pages/contacts-page';
import { LoginPage } from '../pages/login-page/login-page';
import 'antd/dist/antd.css';
import '../index.css';

const App: FC = () => {

	return (
		<>
			<Switch>
				<Route path="/" exact={true}>
					<LoginPage />
				</Route>
				<Route path="/contacts" exact={true}>
					<ContactsPage />
				</Route>
			</Switch>
		</>
	)
}

export default App;
