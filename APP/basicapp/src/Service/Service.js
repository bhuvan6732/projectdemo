import axios from "axios";
import config from "./../config/config";

const getLoginToken = async (loginCreds) => {
  try {
    const response = await axios.post(config.apiUrl + "/login", loginCreds);
    return [response.data.token, null];
  } catch (error) {
    if (error.response.data.message) {
      return [null, error.response.data.message];
    } else {
      return [
        null,
        "Something went wrong Please check your internet and try again",
      ];
    }
  }
};

const signUp = async (userDetails) => {
  try {
    const response = await axios.post(config.apiUrl + "/signUp", userDetails);
    return [response.data.message, null];
  } catch (error) {
    if (error.response) {
      return [null, error.response.data.message];
    } else {
      return [
        null,
        "Something went wrong Please check your internet and try again",
      ];
    }
  }
};

const requestHelp = async (data) => {
  try {
    const response = await axios.post(config.apiUrl + "/help", data);
    return [response.data.message, null];
  } catch (error) {
    if (error.response) {
      return [null, error.response.data.message];
    } else {
      return [
        null,
        "Something went wrong Please check your internet and try again",
      ];
    }
  }
};

export const service = { getLoginToken, signUp, requestHelp };
