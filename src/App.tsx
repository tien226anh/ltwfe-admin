import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import BookIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";

import { dataProvider } from './dataProvider';
import { Dashboard } from './pages/Dashboard';
import { authProvider } from './authProvider';
import { BookCreate, BookEdit, BookList } from './pages/books';
import LoginPage from './customs/LoginPage';


export const App = () => (
    <Admin 
        // authProvider={authProvider}
        dataProvider={dataProvider}
        dashboard={Dashboard}
    >
        <Resource name="books" list={BookList} edit={BookEdit} create={BookCreate} icon={BookIcon}/>
    </Admin>
);