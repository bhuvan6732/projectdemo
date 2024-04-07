const db = require("./../models/index");
const Help = require("./../models/help")(db.sequelize, db.Sequelize.DataTypes);
const User = require("./../models/user")(db.sequelize, db.Sequelize);
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const axios = require("axios");
const token = require("./../Middleware/Token");
const { callDrone } = require("../service/service");
const { getUser } = require("./loginController");

const help = async (req, res) => {
  try {
    console.log("GET HELP CONTROLLER " + req.userid);
    // console.log(req);
    // console.log(getUser(req.id));
    const user = getUser(req.userid);

    const helpLocation = {
      ...user,
      status: undefined,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      altitude: req.body.altitude,
    };

    console.log(helpLocation);

    // const newEmergence = (await Help.create(helpLocation)).toJSON();

    const response = await callDrone(helpLocation);
    // console.log(response);
    if (response[0]) {
      console.log("Sending help for ", helpLocation);
      res
        .status(StatusCodes.ACCEPTED)
        .json({ status: ReasonPhrases.ACCEPTED, message: response[0].message });
      return;
    } else {
      res.status(StatusCodes.BAD_REQUEST);
      return;
    }
    console.log("SOMETHING WENT WRONG");
  } catch (error) {
    console.log(
      "\n-------------------------Internal Error---------------------\n",
      error
    );
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: "Something went wrong...Please try again later here",
    });
  }
};

const upload = (req, res) => {
  res.status(StatusCodes.OK).json(ReasonPhrases.OK);
};

module.exports = { help, upload };
