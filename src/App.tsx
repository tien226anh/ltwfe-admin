import {
  Admin,
  Resource,
} from "react-admin";
import BookIcon from "@mui/icons-material/Book";

import { dataProvider } from "./dataProvider";
import { Dashboard } from "./pages/Dashboard";
import { authProvider } from "./authProvider";
import { BookCreate, BookEdit, BookList } from "./pages/books";
import { CustomLogin } from "./customs/AuthRoutes";
import React from "react";

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      dashboard={Dashboard}
      loginPage={CustomLogin}
    >
      <Resource
        name="books"
        list={BookList}
        edit={BookEdit}
        create={BookCreate}
        icon={BookIcon}
      />
    </Admin>
  );
};
