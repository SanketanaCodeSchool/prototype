import * as React from "react";
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  DateField,
  ImageField,
  ImageInput,
  SimpleShowLayout,
  SimpleForm,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  RichTextField,
  ReferenceField,
  SelectField,
  SelectInput,
  ReferenceInput,
  FileInput,
  FileField,
  ArrayInput,
  ArrayField,
  SimpleFormIterator,
  DateInput,
  ReferenceArrayField,
  ReferenceArrayInput,
  SelectArrayInput,
  SingleFieldList,
  ChipField
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import { FirebaseReferenceField, FirebaseReferenceInput } from './FirebaseReferenceFields';

// const BatchFilter = (props) => (
//   <Filter {...props}>
//     <TextInput label="Search" source="title" alwaysOn />
//   </Filter>
// );

// const ReferenceFilter = (props) => (
//   <Filter {...props}>
//     <ReferenceInput
//       label="Organization"
//       source="user.id"
//       reference="users"
//       allowEmpty
//     >
//       <SelectInput optionText="name" />
//     </ReferenceInput>
//   </Filter>
// );

export const BatchList = (props) => (
  <List
  {...props}
  // filters={<ReferenceFilter />}
  // filter={{ updatedby: "test@example.com" }}
  >
  <Datagrid>
  <TextField source="batch_id" />
  <TextField source="course_name" />
  <TextField source="teacher_name" />
  <TextField source="students" />
  <TextField source="start_date" />
  <DateField source="end_date" />
  <TextField source="updatedby" />
  <TextField source="createdby" />
  <RichTextField source="comments" />
  <ReferenceField label="Student Ref" source="first_name.___refid" reference="students">
  <TextField source="first_name" />
  </ReferenceField>
  
  <ShowButton label="" />
  <EditButton label="" />
  <DeleteButton label="" redirect={false} />
  </Datagrid>
  </List>
  );
  
  // const ConditionalEmailField = ({}) =>
  //   record && record.hasEmail ? (
  //     <EmailField source="email" record={record} {...rest} />
  //   ) : null;
  export const BatchShow = (props) => (
    <Show {...props}>
    <SimpleShowLayout>  
      <TextField source="batch_id" label = "BatchID" />
      
      <DateField source="start_date" />
  
      <RichTextField source="comments" />
      
    
    </SimpleShowLayout>
    </Show>
    );
    
    export const BatchCreate = (props) => (
      <Create {...props}>
      <SimpleForm>
      <TextInput source="batch_id" label = "BatchID" />
      <ReferenceInput
      label="Teacher"
      source="teacher_name"
      reference="teachers"
      // filter={{ isAdmin: true }}
      >
      <SelectInput optionText="teacher_name" />
      </ReferenceInput>
      
      <ReferenceInput
      label="Course"
      source="name"
      reference="courses"
      // filter={{ isAdmin: true }}
      >
      <SelectInput optionText="name" />
      </ReferenceInput>
      
      <ReferenceArrayInput source="Students" reference="students">
      <SelectArrayInput optionText="first_name" translateChoice={false}/>
      </ReferenceArrayInput>
      
      <DateInput source="start_date" />
      
      <DateInput source="end_date"  parse={val => new Date(val)} />
      <RichTextInput source="comments" />
      
      
      
      
      </SimpleForm>
      </Create>
      );
      
      export const BatchEdit = (props) => (
        <Edit {...props}>
        <SimpleForm>
      <TextInput disabled source="batch_id" label = "BatchID" />
      <ReferenceInput
      label="Teacher"
      source="teacher_name"
      reference="teachers"
      // filter={{ isAdmin: true }}
      >
      <SelectInput optionText="teacher_name" />
      </ReferenceInput>
      
      <ReferenceInput
      label="Course"
      source="name"
      reference="courses"
      // filter={{ isAdmin: true }}
      >
      <SelectInput optionText="name" />
      </ReferenceInput>
      
      <ReferenceArrayInput source="Students" reference="students">
      <SelectArrayInput optionText="first_name" translateChoice={false}/>
      </ReferenceArrayInput>
      
      <DateInput source="start_date" />
      
      <DateInput source="end_date"  parse={val => new Date(val)} />
      <RichTextInput source="comments" />
      
      
      </SimpleForm>
        </Edit>
        );
        