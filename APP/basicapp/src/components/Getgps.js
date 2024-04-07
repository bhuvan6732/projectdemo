import React from "react";
import { useState, useEffect } from "react";
import { UserActions } from "../Store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { service } from "./../Service/Service";
import { Button } from "@mui/material";

const Getgps = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => {
    return state.UserToken.token;
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const [cords, setCords] = useState({});
  const [reply, setReply] = useState("");
  const [help, sethelp] = useState(false);

  const logOutHandler = () => {
    dispatch(UserActions.logOut());
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      const emailData = {
        token: token,
      };

      fetch("http://127.0.0.1:3000/getstatus", {
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
          if (typeof data.user.status == "undefined") {
            console.log("request pending");
          } else {
            if (data.user.status) {
              console.log("request approved launching UAV");
              setReply(
                "Request approved by officials and launching UAV for help"
              );
              sethelp(false);
            } else {
              console.log("Request rejected");
              setReply("Request rejected by officials");
              sethelp(false);
            }
          }
        })
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
        });
    };
    let intervalId = "";
    if (help) {
      intervalId = setInterval(() => {
        fetchData();
      }, 5000); // Adjust the interval time as needed (e.g., 1000 ms = 1 second)
    } else {
      console.log("Clearing timer");
      clearInterval(intervalId);
    }
  }, [help]);

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
      sethelp(true);
    } else {
      setCords("Location Not Avaliable");
    }
  };

  return (
    <div className="container">
      <p className="Title">DASHBOARD</p>
      <p className="Data">latitude:{JSON.stringify(cords.latitude)}</p>
      <p className="Data">longitude:{JSON.stringify(cords.longitude)}</p>
      <p className="Data">{reply}</p>
      <br></br>
      <Button onClick={sendHelpHandler} variant="contained">
        Send Help
      </Button>
      <br></br>
      <Button onClick={logOutHandler} variant="contained">
        Sign Out
      </Button>
    </div>
  );
};
export default Getgps;
