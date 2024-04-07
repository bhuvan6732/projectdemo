import validator from "@rjsf/validator-ajv8";

const FormReq = {
  validator:validator,
  schema: {
    title: "",
    type: "object",
    required:["Email","Password"],
    properties: {
      Email: {
        type: "string",
        title:"Username or Email "
      },
      Password: {
        type: "string",
        title:"Password"
      },
    },
  },
};

export default FormReq;
