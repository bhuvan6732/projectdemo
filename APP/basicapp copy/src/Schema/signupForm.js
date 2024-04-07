import validator from "@rjsf/validator-ajv8";

const Specifications = {
  validator: validator,
  schema: {
    title: "",
    type: "object",
    required: [
      "Name",
      "Age",
      "Email",
      "Password",
      "RePassword",
      "Phone",
      "Aadhar",
      "Address",
      "EmergenceContact",
    ],
    properties: {
      Name: {
        type: "string",
        title: "Name",
      },
      Age: {
        type: "number",
        title: "Age",
      },
      Email: {
        type: "string",
        title: "Email ",
      },
      Password: {
        type: "string",
        title: "Password",
      },
      RePassword: {
        type: "string",
        title: "Password",
      },
      Phone: {
        type: "string",
        title: "Phone",
      },
      Aadhar: {
        type: "string",
        title: "Aadhar",
      },
      Address: {
        type: "string",
        title: "Address",
      },
      EmergenceContact: {
        type: "string",
        title: "EmergenceContact",
      },
    },
  },
};

export default Specifications;
