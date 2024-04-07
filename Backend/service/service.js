const axios = require("axios");

const callDrone = async (data) => {
  try {
    droneapi = "http://127.0.0.1:4000/api/sendhelp";
    console.log("DRONE API IN SERVICE.JS :" + droneapi);
    const response = await axios.post(droneapi, data);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
module.exports = { callDrone };
