import { useMediaQuery } from "@mui/material";
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  DateField,
  useRecordContext,
  NumberField,
  ShowButton, // Thêm ShowButton vào import
  useDataProvider,
} from "react-admin";
import { useHistory } from "react-router-dom";
import { routes } from "../constants";
import { CustomImageField } from "../customs/CustomImageField";

const BookTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

export const BookList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const history = useHistory();
  const dataProvider = useDataProvider();

  const handleView = (id) => {
    history.push(`${routes.customView}/${id}`);
  };

  return (
    <List
      {...props}
      disableAuthentication
      perPage={20}
      filters={<BookFilter />}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.title}
          secondaryText={(record) => record.author}
          tertiaryText={(record) => record.describe}
        />
      ) : (
        <Datagrid>
          <TextField source="_id" />
          <CustomImageField source="cover" />
          <TextField source="title" />
          <TextField source="author" />
          <TextField source="describe" />
          <TextField source="category" />
          <NumberField source="page_number" />
          <DateField source="release_date" />
          <ShowButton label="View" onClick={handleView} />
        </Datagrid>
      )}
    </List>
  );
};
