import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./Forms";

export const store = configureStore({ reducer: { form: formReducer } });
