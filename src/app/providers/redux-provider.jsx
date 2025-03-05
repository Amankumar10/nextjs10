"use client"; // Mark this as a Client Component

import { store } from "../rtkQuery/lib/store";
import { Provider } from "react-redux";

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
