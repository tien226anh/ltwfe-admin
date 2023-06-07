import { useState } from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  NumberField,
  Button,
  TextInput,
  NumberInput,
  DateInput,
} from "react-admin";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";

export const CustomView = (props) => {
  const navigateTo = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  const handleSave = () => {
    // Perform save logic after editing
    setIsEditMode(false);
  };

  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="title" />
        <TextField source="author" />
        <TextField source="describe" />
        <TextField source="category" />
        <NumberField source="page_number" />
        <DateField source="release_date" />
        <NumberField source="price" />

        {!isEditMode && (
          <Button label="Edit" onClick={handleEdit} variant="outlined" />
        )}

        {isEditMode && (
          <>
            {/* Display fields for editing */}
            <TextInput source="title" />
            <TextInput source="author" />
            <TextInput source="describe" multiline rows={10} />
            <TextInput source="category" />
            <NumberInput source="page_number" />
            <DateInput source="release_date" />
            <NumberInput source="price" />
            <Button label="Save" onClick={handleSave} variant="outlined" />
            <Button label="Cancel" onClick={handleCancel} variant="outlined" />
          </>
        )}
      </SimpleShowLayout>
    </Show>
  );
};
