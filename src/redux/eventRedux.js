import { ref, push, update, remove, onValue } from "firebase/database";
import initialState from "./initialState";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase/firebase";
// selectors
export const getAllEvents = (state) => state.data.events;
const createActionName = (name) => `app/events/${name}`;

export const ADD_EVENT = createActionName("ADD_EVENT");
export const UPDATE_EVENT = createActionName("UPDATE_EVENT");
export const DELETE_EVENT = createActionName("DELETE_EVENT");
export const SET_EVENTS = createActionName("SET_EVENTS");

// Action creators
export const addEvent = (event) => async (dispatch) => {
  const newEventRef = push(ref(db, "events/"));
  const eventId = newEventRef.key;
  const newEvent = { id: eventId, ...event };
  await update(newEventRef, newEvent);
  dispatch({
    type: ADD_EVENT,
    payload: newEvent,
  });
};

export const updateEvent = (event) => async (dispatch) => {
  const eventRef = ref(db, `events/${event.id}`);
  await update(eventRef, event);
  dispatch({
    type: UPDATE_EVENT,
    payload: event,
  });
};

export const deleteEvent = (eventId) => async (dispatch) => {
  const eventRef = ref(db, `events/${eventId}`);
  await remove(eventRef);
  dispatch({
    type: DELETE_EVENT,
    payload: eventId,
  });
};

// Pobieranie wszystkich wydarzeń z Firebase
export const fetchEventsFromFirebase = () => (dispatch) => {
  const eventsRef = ref(db, "events/");
  onValue(eventsRef, (snapshot) => {
    const events = snapshot.val();
    const eventsArray = events
      ? Object.keys(events).map((key) => ({ id: key, ...events[key] }))
      : [];
    dispatch({
      type: SET_EVENTS,
      payload: eventsArray,
    });
  });
};
// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [
          ...state.events,
          {
            ...action.payload,
            id: action.payload.id || uuidv4(), // Dodaj UUID tylko wtedy, gdy id nie jest przekazane
          },
        ],
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id
            ? { ...event, ...action.payload }
            : event
        ),
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    default:
      return state;
  }
}
