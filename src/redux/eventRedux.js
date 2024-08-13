import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import initialState from "./initialState";

// selectors
export const getAllEvents = (state) => state.data.events;
const createActionName = (name) => `app/events/${name}`;

export const ADD_EVENT = createActionName("ADD_EVENT");
export const UPDATE_EVENT = createActionName("UPDATE_EVENT");
export const DELETE_EVENT = createActionName("DELETE_EVENT");
export const SET_EVENTS = createActionName("SET_EVENTS");

// Action creators
export const addEvent = (event) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "events"), event);
    dispatch({
      type: ADD_EVENT,
      payload: { id: docRef.id, ...event },
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const updateEvent = (id, updatedEvent) => async (dispatch) => {
  const eventRef = doc(db, "events", id);
  try {
    await updateDoc(eventRef, updatedEvent);
    dispatch({
      type: UPDATE_EVENT,
      payload: { id, ...updatedEvent },
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  const eventRef = doc(db, "events", id);
  try {
    await deleteDoc(eventRef);
    dispatch({
      type: DELETE_EVENT,
      payload: id,
    });
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

// Fetching events from Firestore
export const fetchEvents = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch({
      type: SET_EVENTS,
      payload: events,
    });
  } catch (e) {
    console.error("Error fetching documents: ", e);
  }
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
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
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
}
