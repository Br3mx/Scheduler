import initialState from "./initialState";
import { v4 as uuidv4 } from "uuid";

// selectors
export const getAllEvents = (state) => state.data.events;
const createActionName = (name) => `app/events/${name}`;

export const ADD_EVENT = createActionName("ADD_EVENT");
export const UPDATE_EVENT = createActionName("UPDATE_EVENT");
export const DELETE_EVENT = createActionName("DELETE_EVENT");

// Action creators
export const addEvent = (event) => ({
  type: ADD_EVENT,
  payload: event,
});

export const updateEvent = (event) => ({
  type: UPDATE_EVENT,
  payload: event,
});

export const deleteEvent = (eventId) => ({
  type: DELETE_EVENT,
  payload: eventId,
});
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
