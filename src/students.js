import * as React from "react";
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  Filter,
  SimpleShowLayout,
  SimpleForm,
  TextField,
  TextInput,
  DateField,
  DateInput,
  BooleanField,
  BooleanInput,
  EmailField,
  ShowButton,
  EditButton,
  DeleteButton,
} from "react-admin";

export const StudentFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="first_name" alwaysOn />
  </Filter>
);

export const StudentList = (props) => (
  <List {...props} filters={<StudentFilter />}>
    <Datagrid>
      <TextField source="student_id" label="StudentID" />
      <TextField source="first_name" label="FirstName" />
      <TextField source="last_name" label="LastName" />
      <DateField source="dob" label="DOB" />
      <TextField source="registered_phone" label="Phone" />
      <EmailField source="registered_email" label="Email" />
      <TextField source="status" />
      <BooleanField source="active" />
      <TextField source="lifecycle_stage" />
      <TextField source="grade" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

export const StudentShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="student_id" label="Student ID" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <DateField source="dob" />
      <TextField source="grade" />
      <TextField source="parent_name" label="Parent's Name" />
      <TextField source="registered_phone" />
      <TextField source="student_phone" />
      <TextField source="alternate_phone" />
      <TextField source="registered_email" />
      <TextField source="student_email" />
      <TextField source="alternate_email" />
      <TextField source="status" />
      <TextField source="address" />
      <TextField source="city" />
      <TextField source="country" />
      <TextField source="timezone" />
      <BooleanField source="active" />
      <TextField source="billing_plan" />
      <TextField source="currency" />
      <DateField source="joined_date" />
      <DateField source="left_date" />
      <TextField source="lifecycle_stage" />
      <TextField source="country_code" />
      <TextField source="acquisition_channel" />
      <TextField source="parent_profession" />
    </SimpleShowLayout>
  </Show>
);

export const StudentCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="student_id" label="Student ID" />
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <DateInput source="dob" />
      <TextInput source="grade" />
      <TextInput source="parent_name" label="Parent's Name" />
      <TextInput source="registered_phone" />
      <TextInput source="student_phone" />
      <TextInput source="alternate_phone" />
      <TextInput source="registered_email" />
      <TextInput source="student_email" />
      <TextInput source="alternate_email" />
      <TextInput source="status" />
      <TextInput source="address" />
      <TextInput source="city" />
      <TextInput source="country" />
      <TextInput source="timezone" />
      <BooleanInput source="active" />
      <TextInput source="billing_plan" />
      <TextInput source="currency" />
      <DateInput source="joined_date" />
      <DateInput source="left_date" default={null} />
      <TextInput source="lifecycle_stage" />
      <TextInput source="country_code" />
      <TextInput source="acquisition_channel" />
      <TextInput source="parent_profession" />
    </SimpleForm>
  </Create>
);

export const StudentEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="student_id" label="Student ID" />
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <DateInput source="dob" />
      <TextInput source="grade" />
      <TextInput source="parent_name" label="Parent's Name" />
      <TextInput source="registered_phone" />
      <TextInput source="student_phone" />
      <TextInput source="alternate_phone" />
      <TextInput source="registered_email" />
      <TextInput source="student_email" />
      <TextInput source="alternate_email" />
      <TextInput source="status" />
      <TextInput source="address" />
      <TextInput source="city" />
      <TextInput source="country" />
      <TextInput source="timezone" />
      <BooleanInput source="active" />
      <TextInput source="billing_plan" />
      <TextInput source="currency" />
      <DateInput source="joined_date" />
      <DateInput source="left_date" default={null} />
      <TextInput source="lifecycle_stage" />
      <TextInput source="country_code" />
      <TextInput source="acquisition_channel" />
      <TextInput source="parent_profession" />
    </SimpleForm>
  </Edit>
);
