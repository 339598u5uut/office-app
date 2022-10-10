# **Приложение: Личный кабинет**
*** 
### ТЗ для front-end developer:
* Напишите приложение личного кабинета.
* Задание необходимо выполнить на TypeScript, без использования any и ts-ignore. 
* При выполнении работы обязательно использовать стейт менеджер (redux, mobx).
* В разработке можно пользоваться UI фреймворками (использован Ant Design of React).
* Для реализации авторизации можно использовать запросы с моковыми данными. https://github.com/typicode/json-server (использован).
* В приложении должно быть две страницы - страница входа и страница со списком контактов.
* Страница контактов пользователя должна быть доступна только после авторизации.
* На странице контактов должна быть возможность добавлять/удалять/редактировать контакты, также желательно наличие функции поиска.
* Оформление и данные для заполнения страниц на ваше усмотрение.
* Обязательно добавьте информацию в readme о том, как запускать ваше приложение.
* Время на выполнение тестового задания не ограничено.

#### Для проверки задания:
node: v16.8.0
git clone https://github.com/339598u5uut/office-app.git
cd office-app
npm i
npm start
json-server data.json (иногда по умолчанию устанавливается дефолтный, нужно его удалить)
login: test
password: 1234

***


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
