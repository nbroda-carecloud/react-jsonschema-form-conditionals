import React from "react";
import applyRules from "../../src/index";
import Form from "react-jsonschema-form";

const schema = {
  title: "A registration form",
  type: "object",
  required: ["firstName", "lastName"],
  properties: {
    firstName: {
      type: "string",
      title: "First name",
    },
    lastName: {
      type: "string",
      title: "Last name",
    },
    age: {
      type: "integer",
      title: "Age",
    },
    bio: {
      type: "string",
      title: "Bio",
    },
    password: {
      type: "string",
      title: "Password",
      minLength: 3,
    },
    telephone: {
      type: "string",
      title: "Telephone",
      minLength: 10,
    },
  },
};

const uiSchema = {
  firstName: {
    classNames: "col-md-4 col-xs-4 success",
    "ui:autofocus": true,
    "ui:emptyValue": "",
  },
  lastName: {
    classNames: "col-md-4 col-xs-4",
  },
  age: {
    classNames: "col-md-4 col-xs-4",
    "ui:widget": "updown",
    "ui:title": "Age of person",
  },
  bio: {
    "ui:widget": "textarea",
    classNames: "col-md-12",
  },
  password: {
    classNames: "col-md-6 col-xs-6",
    "ui:widget": "password",
    "ui:help": "Hint: Make it strong!",
  },
  date: {
    classNames: "col-md-6 col-xs-6",
    "ui:widget": "alt-datetime",
  },
  telephone: {
    classNames: "col-md-6 col-xs-6",
    "ui:options": {
      inputType: "tel",
    },
  },
};

const rules = [
  {
    conditions: { firstName: "empty" },
    event: {
      type: "remove",
      params: { fields: ["password"] },
    },
  },
  {
    conditions: { age: { greater: 20 } },
    event: {
      type: "require",
      params: { fields: ["telephone"] },
    },
  },
];

const formData = {
  lastName: "",
  firstName: "",
  age: 20,
};

let extraActions = {
  enlarge: function(field, schema, uiSchema) {
    uiSchema[field].classNames = "col-md-8";
    return { schema, uiSchema };
  },
};

let FormWithConditionals = applyRules(Form);

export function App() {
  return (
    <FormWithConditionals
      onSchemaConfChange={nextSchemaConf =>
        console.log(`Conf changed ${JSON.stringify(nextSchemaConf.schema)}`)}
      rules={rules}
      extraActions={extraActions}
      liveValidate={false}
      safeRenderCompletion={true}
      noHtml5Validate={true}
      formData={formData}
      schema={schema}
      uiSchema={uiSchema}
    />
  );
}
