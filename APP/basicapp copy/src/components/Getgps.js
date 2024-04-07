import React from "react";
import { useState, useEffect } from "react";
import { UserActions } from "../Store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { service } from "./../Service/Service";
import { Button } from "@mui/material";
// import { Card, CardContent, Typography } from "@mui/material";
import {
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const Getgps = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => {
    return state.UserToken.token;
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Replace 'http://your-server-endpoint' with your actual server endpoint
      fetch("https://projectdemorpiserver.onrender.com/api/helps")
        .then(async (response) => {
          if (response.ok) {
            console.log("Server ping successful");
            const jsonData = await response.json();
            console.log(jsonData.req);
            setData(jsonData.req);
            // console.log(response.body);
          } else {
            console.error("Server ping f  ailed");
          }
        })
        .catch((error) => {
          console.error("Error pinging server:", error);
        });
    }, 5000); // Ping every 1000 milliseconds (1 second)
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const [cords, setCords] = useState({});
  const [reply, setReply] = useState("Welcome to the Dashboard");

  const logOutHandler = () => {
    dispatch(UserActions.logOut());
    navigate("/login");
  };

  const sendHelpHandler = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (data) => {
        const locationData = {
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
          altitde: data.coords.altitude,
        };
        const response = await service.requestHelp({ token, ...locationData });
        if (response[0]) {
          setReply(response[0]);
        } else {
          setReply(response[1]);
        }
        setCords(locationData);
      });
    } else {
      setCords("Location Not Avaliable");
    }
  };

  const renderCards = () => {
    return data.map((item, index) => <Card1 key={index} data={item} />);
  };

  return (
    <div className="container">
      <p className="Title">DASHBOARD</p>
      {/* <p className="Data">latitude:{JSON.stringify(cords.latitude)}</p>
      <p className="Data">longitude:{JSON.stringify(cords.longitude)}</p>
      <p className="Data">{reply}</p>
      <br></br>
      <Button onClick={sendHelpHandler} variant="contained">
        Send Help
      </Button> */}

      <div className="card-container">{renderCards()}</div>

      <br></br>
      <Button onClick={logOutHandler} variant="contained">
        Sign Out
      </Button>
    </div>
  );
};
export default Getgps;

const Card1 = ({ data }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const RejectHandle = (Email) => {
    const emailData = { Email };
    fetch("https://projectdemorpiserver.onrender.com/api/reject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
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
    handleDialogClose();
  };

  const ApproveHandle = (Email) => {
    const emailData = { Email };
    fetch("https://projectdemorpiserver.onrender.com/api/accept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
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
    handleDialogClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <Card onClick={handleDialogOpen}>
        <CardContent>
          <Typography variant="h5" component="div">
            {data.Name}
          </Typography>
          <Typography variant="body1">
            Status:{" "}
            {typeof data.status === "undefined"
              ? "Pending"
              : data.status
              ? "Approved"
              : "Rejected"}
          </Typography>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>SOS Details</DialogTitle>
        <DialogContent>
          {/* Render additional details in the dialog */}
          <Typography variant="body1">
            <Typography variant="h5" component="div">
              {data.Name}
            </Typography>
            <Typography variant="body1">
              Status:{" "}
              {typeof data.status === "undefined"
                ? "Pending"
                : data.status
                ? "Approved"
                : "Rejected"}
            </Typography>
            <Typography variant="body1">Time: {data.time}</Typography>
            <Typography variant="body1">
              EmergenceContact:{" "}
              <a href={"tel:" + data.EmergenceContact}>
                {data.EmergenceContact}
              </a>
            </Typography>
            <Typography variant="body1">
              Contact: <a href={"tel:" + data.Phone}>{data.Phone}</a>
            </Typography>
            <Typography variant="body1">latitude: {data.latitude}</Typography>
            <Typography variant="body1">longitude: {data.longitude}</Typography>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              ApproveHandle(data.Email);
            }}
          >
            Approve
          </Button>
          <Button
            onClick={() => {
              RejectHandle(data.Email);
            }}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
