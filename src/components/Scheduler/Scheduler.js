import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  EditingState,
  IntegratedEditing,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import {
  addEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  fetchEvents,
} from "../../redux/eventRedux";
import style from "./Sheluder.module.scss";

const SchedulerComponent = () => {
  const dispatch = useDispatch();
  const events = useSelector(getAllEvents);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  console.log("events", events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      dispatch(addEvent(added));
      console.log("add", added);
    }

    if (changed) {
      Object.keys(changed).forEach((id) => {
        dispatch(updateEvent(id, changed[id]));
      });
      console.log("change", changed);
    }

    if (deleted !== undefined) {
      dispatch(deleteEvent(deleted));
      console.log("delete", deleted);
    }
  };

  return (
    <Paper className={style.paper}>
      <Scheduler data={Array.isArray(events) ? events : []} locale="pl-PL">
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
        />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <DayView startDayHour={9} endDayHour={19} />
        <WeekView startDayHour={9} endDayHour={19} />
        <MonthView />
        <Toolbar />
        <DateNavigator />
        <ViewSwitcher />
        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm />
      </Scheduler>
    </Paper>
  );
};

export default SchedulerComponent;
