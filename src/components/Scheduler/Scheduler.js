import React, { useState } from "react";
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

const SchedulerComponent = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const commitChanges = ({ added, changed, deleted }) => {
    let updatedEvents = [...events];

    if (added) {
      const startingAddedId =
        events.length > 0 ? events[events.length - 1].id + 1 : 0;
      updatedEvents = [...updatedEvents, { id: startingAddedId, ...added }];
      console.log("Added Event:", { id: startingAddedId, ...added });
    }

    if (changed) {
      updatedEvents = updatedEvents.map((event) =>
        changed[event.id] ? { ...event, ...changed[event.id] } : event
      );
      console.log("Changed Event:", changed);
    }

    if (deleted !== undefined) {
      updatedEvents = updatedEvents.filter((event) => event.id !== deleted);
      console.log("Deleted Event ID:", deleted);
    }

    setEvents(updatedEvents);
    console.log("Updated Events:", updatedEvents);
  };

  return (
    <Paper>
      <Scheduler data={events} locale="pl-PL">
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
