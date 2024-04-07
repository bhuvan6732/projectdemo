const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const pingServer = (req, res) => {
  res.status(StatusCodes.OK).json({
    status: ReasonPhrases.OK,
    message: "Server is running on port 3000",
  });
};

module.exports = { pingServer };
