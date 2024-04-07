const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const db = require("./../models/index");
const User = require("../models/user")(db.sequelize, db.Sequelize.DataTypes);
const { getUser } = require("./../controller/loginController");

const genarateWebToken = (User) => {
  const R_token = jwt.sign(User.Email, "iugbeoingbjvpisergsvjvnawieufhisj");
  const A_token = jwt.sign(
    { id: User.Email },
    "iugbeoingbjvpisergsvjvnawieufhisj",
    {
      expiresIn: "10m",
    }
  );

  return { R_token, A_token };
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (token) {
      console.log(token);
      const valid = jwt.verify(token, "iugbeoingbjvpisergsvjvnawieufhisj");

      const d = new Date().getTime();
      console.log(valid, d.toString().slice(0, 10));
      // if (d < valid.exp.toString() + "000") {
      //   const userDetails = await User.findOne({
      //     attributes: [
      //       ["id", "user_id"],
      //       "Name",
      //       "Age",
      //       "Email",
      //       "Aadhar",
      //       "Address",
      //       "Phone",
      //       "EmergencyContact",
      //     ],
      //     where: { id: valid.id },
      //   });
      console.log(typeof getUser);
      // console.log(Object.getOwnPropertyNames(getUser));
      // const user = getUser(valid.id);
      req.userid = valid.id;
      console.log("token fucntion", req.userid);
      next();
    } else {
      throw jwt.JsonWebTokenError;
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        status: ReasonPhrases.UNAUTHORIZED,
        message: "Token expired",
      });
    } else {
      console.log(
        "\n-------------------------Internal Error---------------------\n",
        error
      );
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ReasonPhrases.INTERNAL_SERVER_ERROR,
        message: "Something went wrong...Please try again later",
      });
    }
  }
};

module.exports = { genarateWebToken, verifyToken };
