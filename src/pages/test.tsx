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