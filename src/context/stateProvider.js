import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ initialState, reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
// The children is what is wrapped inside the context API so <App/>

export const useStateProviderValue = () => useContext(StateContext);

// Anytime need to get/set/dispatch to dataLayer we have to useContext with context inside
