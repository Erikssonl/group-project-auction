import React, { useState } from "react";
import AuctionDetails from "./components/AuctionDetails.jsx";
import "./App.css";
import Header from "./components/header";
import SwitchComponent from "./components/SwitchComponent.jsx";
import Footer from "./components/Footer.jsx";

function App() {

  return (
    <>
      <Header />
      <SwitchComponent />
      <Footer />
    </>
  );
}

export default App;
