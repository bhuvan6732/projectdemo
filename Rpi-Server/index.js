const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { exec } = require("child_process");

const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

const requests = [];
app.use(cors());
app.use(express.json());

app.get("/api/helps", (req, res) => {
  console.log("Ping");
  res.json({ req: requests });
});

app.post("/api/sendhelp", (req, res) => {
  console.log(req.body);
  const existingItem = requests.find((item) => item.Email === req.body.Email);
  if (existingItem) {
    const userIndex = requests.findIndex(
      (user) => user.Email === req.body.Email
    );

    if (userIndex !== -1) {
      // Update the user object at the found index
      requests[userIndex] = {
        ...req.body,
        time: new Date().toUTCString(),
        Password: undefined,
        status: undefined,
      };
    }

    res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: "Requesting police for confirmation",
    });
    return;
  }
  requests.push({
    ...req.body,
    time: new Date().toUTCString(),
    Password: undefined,
  });
  res.status(StatusCodes.OK).json({
    status: ReasonPhrases.OK,
    message: "Requesting police for confirmation",
  });

  // const pythonScript = "start_driver.py";
  // const args = [
  //   req.body.latitude,
  //   req.body.longitude,
  //   req.body.id,
  //   req.body.user_id,
  // ];
  // const command = `python3 ./${pythonScript} ${args.join(" ")}`;
  // exec(command, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error: ${error.message}`);
  //     return;
  //   }
  //   if (stderr) {
  //     console.error(`Error: ${stderr}`);
  //     return;
  //   }
  //   console.log(`${stdout}`);
  // });
});

app.post("/api/accept", (req, res) => {
  const existingItem = requests.find((item) => item.Email === req.body.Email);
  if (existingItem) {
    const userIndex = requests.findIndex(
      (user) => user.Email === req.body.Email
    );

    if (userIndex !== -1) {
      // Update the user object at the found index
      requests[userIndex] = {
        ...existingItem,
        status: true,
      };
    }
    res.json({ status: "true", data: "Rejecting UAV" });

    fetch("https://backend-27nr.onrender.com/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email: req.body.Email, status: true }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Response from server:", data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }
});

app.post("/api/reject", (req, res) => {
  const existingItem = requests.find((item) => item.Email === req.body.Email);
  if (existingItem) {
    const userIndex = requests.findIndex(
      (user) => user.Email === req.body.Email
    );

    if (userIndex !== -1) {
      // Update the user object at the found index
      requests[userIndex] = {
        ...existingItem,
        status: false,
      };
    }
    res.json({ status: "true", data: "Rejecting UAV" });
    fetch("https://backend-27nr.onrender.com/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email: req.body.Email, status: false }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Response from server:", data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
