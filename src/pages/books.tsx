import { useMediaQuery } from "@mui/material";
import { List, SimpleList, Datagrid, TextField, DateField, useRecordContext, NumberField, EditButton, useDataProvider, Edit, TextInput, SimpleForm, DateInput, NumberInput, Create, Pagination, ReferenceInput, Filter } from "react-admin";
import { CustomImageField } from "../customs/CustomImageField";

const BookTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.title}"` : ''}</span>;
}

const BookFilter = (props) => (
  <Filter {...props}>
      <TextInput label="Title" source="title" alwaysOn />
      <TextInput label="Author" source="author" alwaysOn />
      <TextInput label="Category" source="category" alwaysOn />
  </Filter>
);

export const BookList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <List 
      {...props} 
      disableAuthentication
      perPage={20}
      pagination={<Pagination rowsPerPageOptions={[5, 10, 25, 50]}/>}
      filters={<BookFilter/>}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.title}
          secondaryText={(record) => record.author}
          tertiaryText={(record) => record.describe}
        />
      ) : (
        <Datagrid>
          <TextField source="_id"/>
          <CustomImageField source="cover"/>
          <TextField source="title" />
          <TextField source="author" />
          <TextField source="describe" />
          <TextField source="category" />
          <NumberField source="page_number"/>
          <DateField source="release_date"/>
          <EditButton/>
        </Datagrid>
      )}
    </List>
  );
};

export const BookEdit = () => (
  <Edit title={<BookTitle/>}>
    <SimpleForm>
      {/* <TextInput source="_id" disabled/> */}
      <TextInput source="title" />  
      <TextInput source="author" />  
      <TextInput source="describe"  multiline rows={10}/>  
      <TextInput source="category" />  
      <NumberInput source="page_number" />
      <DateInput source="release_date" />
      <NumberInput source="price"/>
    </SimpleForm>
  </Edit>
);

export const BookCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" />  
      <TextInput source="author" />  
      <TextInput source="describe"  multiline rows={10}/>  
      <TextInput source="category" />  
      <NumberInput source="page_number" />
      <DateInput source="release_date" />
      <NumberInput source="price"/>
    </SimpleForm>
  </Create>
)