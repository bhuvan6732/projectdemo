import React from "react";
import Getgps from "./components/Getgps";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from './components/Signup';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Getgps></Getgps>}></Route>
        <Route path="/Login" element={<Login></Login>}></Route>
        <Route path="Signup" element={<Signup></Signup>}></Route>
      </Routes>
    </>
  );
}

export default App;
