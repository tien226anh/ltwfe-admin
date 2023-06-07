import { Admin, Resource } from "react-admin";
import BookIcon from "@mui/icons-material/Book";

import { dataProvider } from "./dataProvider";
import { Dashboard } from "./pages/Dashboard";
import { authProvider } from "./authProvider";
import { BookCreate, BookEdit, BookList } from "./pages/books";
import { CustomView } from "./customs/CustomView";

export const App = () => {
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      dashboard={Dashboard}
    >
      <Resource
        name="books"
        list={BookList}
        show={CustomView}
        edit={BookEdit}
        create={BookCreate}
        icon={BookIcon}
      />
    </Admin>
  );
};
