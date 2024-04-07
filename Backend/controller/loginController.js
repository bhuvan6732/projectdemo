const db = require("./../models/index");
const User = require("../models/user")(db.sequelize, db.Sequelize.DataTypes);
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const bcrypt = require("bcrypt");
const saltRound = process.env.SALT_ROUND;
const Token = require("./../Middleware/Token");

const users = [
  {
    Name: "John Doe",
    Age: 30,
    Email: "demo",
    Password: "$2b$10$FosQ27rvaqWByrt6Hr5S8eRT.sCYBMQkGS9CE0MY6L0wQk5tuRz.C", // hashed password for 'demo'
    Aadhar: "123456789012",
    Address: "123 Street, City",
    Phone: "1234567890",
    EmergenceContact: "9876543210",
    Username: "johndoe",
  },
  // Add more mock users as needed
];
const logIn = async (req, res) => {
  const currentUser = { Email: req.body.Email, Password: req.body.Password };
  try {
    // const userExits = await User.findOne({
    //   where: { Email: currentUser.Email },
    // });

    const userExits = users.find((user) => user.Email === currentUser.Email);

    if (!userExits) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: ReasonPhrases.NOT_FOUND,
        message: "Invalid Email or Username",
      });
      return;
    }
    if (userExits) {
      const validCreds = await bcrypt.compare(
        currentUser.Password,
        userExits.Password
      );
      if (!validCreds) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          status: ReasonPhrases.UNAUTHORIZED,
          message: "Invalid Password",
        });
        return;
      } else {
        const token = Token.genarateWebToken(userExits);
        res.status(StatusCodes.OK).json({
          status: ReasonPhrases.OK,
          token: token,
          Email: req.body.userid,
        });
      }
    }
  } catch (error) {
    console.log(
      "\n-------------------------Internal Error---------------------\n",
      error
    );
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: "Something went wrong...Please try again later",
    });
  }
};

function getUser(Email) {
  const userExits = users.find((user) => user.Email === Email);
  return userExits;
}

function updateuser(Email, status) {
  const existingItem = users.find((item) => item.Email === Email);
  if (existingItem) {
    const userIndex = users.findIndex((user) => user.Email === Email);

    if (userIndex !== -1) {
      // Update the user object at the found index
      users[userIndex] = {
        ...existingItem,
        status: status,
      };
    }
    // res.json({ status: "true", data: "updated UAV" });
  }
}

const signUp = async (req, res) => {
  try {
    const newUserDetails = {
      Name: req.body.Name,
      Age: req.body.Age,
      Email: req.body.Email,
      Password: req.body.Password,
      Aadhar: req.body.Aadhar,
      Address: req.body.Address,
      Phone: req.body.Phone,
      EmergenceContact: req.body.EmergenceContact,
    };
    //  const validation = newUserDetails.validate();

    // const userExits = await User.findOne({
    //   where: {
    //     [db.Sequelize.Op.or]: [
    //       { Email: newUserDetails.Email },
    //       { Aadhar: newUserDetails.Aadhar },
    //       { Phone: newUserDetails.Phone },
    //     ],
    //   },
    // });

    const userExits = users.find(
      (user) =>
        user.Email === newUserDetails.Email ||
        user.Aadhar === newUserDetails.Aadhar ||
        user.Phone === newUserDetails.Phone ||
        user.Username === newUserDetails.Username
    );

    if (userExits) {
      res.status(StatusCodes.CONFLICT).json({
        status: ReasonPhrases.CONFLICT,
        message: "User already exits",
      });
      return;
    } else {
      const salt = await bcrypt.genSalt(parseInt(saltRound));
      const hashedPassword = await bcrypt.hash(newUserDetails.Password, salt);
      console.log(hashedPassword);
      newUserDetails.Password = hashedPassword;
      users.push(newUserDetails);
      // const newUser = await User.create(newUserDetails);
      if (newUserDetails) {
        res.status(StatusCodes.CREATED).json({ status: ReasonPhrases.CREATED });
        return;
      }
    }
  } catch (error) {
    console.log(
      "\n-------------------------Internal Error---------------------\n",
      error
    );
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: "Something went wrong...Please try again later",
    });
  }
};

module.exports = { logIn, signUp, getUser, updateuser };
