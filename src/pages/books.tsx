import { useMediaQuery } from "@mui/material";
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  DateField,
  useRecordContext,
  NumberField,
  EditButton,
  useDataProvider,
  Edit,
  TextInput,
  SimpleForm,
  DateInput,
  NumberInput,
  Create,
  Pagination,
  ReferenceInput,
  Filter,
  DeleteButton,
  ShowButton,
  ImageInput,
} from "react-admin";
import { CustomImageField} from "../customs/CustomImageField";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";

const BookTitle = () => {
  const record = useRecordContext();
  return <span>Books {record ? `"${record.title}"` : ""}</span>;
};

const BookFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Title" source="title" alwaysOn />
    <TextInput label="Author" source="author" alwaysOn />
    <TextInput label="Category" source="category" alwaysOn />
  </Filter>
);

export const BookList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const dataProvider = useDataProvider();
  const navigateTo = useNavigate();

  const handleView = (_id) => {
    navigateTo(`${routes.book}/${_id}`);
  };

  const handleDelete = (_id) => {
    dataProvider
      .delete("books", { _id })
      .then(() => {
        // Xử lý thành công
      })
      .catch((error) => {
        // Xử lý lỗi
      });
  };

  return (
    <List
      {...props}
      disableAuthentication
      perPage={10}
      pagination={<Pagination rowsPerPageOptions={[5, 10, 25, 50]} />}
      filters={<BookFilter />}
    >
      {isSmall ? (
        <SimpleList
          leftIcon={({ record }) => (
            <CustomImageField record={record} source="cover" />
          )}
          primaryText={(record) => record.title}
          secondaryText={(record) => record.author}
          tertiaryText={(record) => record.describe}
          linkType="show"
        />
      ) : (
        <Datagrid>
          <TextField source="_id" />
          <CustomImageField source="cover" />
          <TextField source="title" />
          <TextField source="author" />
          <div style={{ maxHeight: "100px", overflowY: "auto",  }}>
            <TextField source="describe" />
          </div>
          <TextField source="category" />
          <NumberField source="page_number" />
          <DateField source="release_date" />
          <ShowButton label="View" onClick={handleView} />
          <DeleteButton label="Delete" onClick={handleDelete} />
        </Datagrid>
      )}
    </List>
  );
};

const divStyle = {
  display: "flex",
  justifyContent: "space-around",
}

export const BookEdit = (props) => (  
  <Edit title={<BookTitle />} {...props}>
    <SimpleForm>
      <div className="form" style={divStyle}>
        <div>
          <TextInput required source="title" fullWidth/>
          <TextInput required source="author" fullWidth/>
          <TextInput required source="describe" multiline rows={5} fullWidth/>
          <TextInput required source="category" fullWidth/>
          <NumberInput source="page_number" fullWidth/>
          <DateInput source="release_date" fullWidth/>
          <NumberInput source="price" fullWidth/>
        </div>
      </div>
    </SimpleForm>
  </Edit>
);

export const BookCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput required source="title" fullWidth/>
      <TextInput required source="author" fullWidth/>
      <TextInput required source="describe" multiline rows={10} fullWidth/>
      <TextInput required source="category" fullWidth/>
      <NumberInput source="page_number" fullWidth/>
      <DateInput source="release_date" fullWidth/>
      <NumberInput source="price" fullWidth/>
    </SimpleForm>
  </Create>
);
