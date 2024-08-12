import React, { useEffect, useState } from "react";
import Home from "./components/pages/Home/Home";

const App = () => {
  console.log("env", process.env.NODE_ENV);
  return (
    <>
      <Home />
    </>
  );
};

export default App;
