import React from "react";
import SchedulerComponent from "../../Scheduler/Scheduler";
import style from "./Home.module.scss";
const Home = () => {
  return (
    <div className={style.container}>
      <SchedulerComponent />
    </div>
  );
};

export default Home;
