import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import { legacy_createStore as createStore } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { reducer, RootState } from "./reducers";

const makeStore: MakeStore<RootState> = (context: Context) => createStore(reducer);

export const wrapper = createWrapper<RootState>(makeStore, {debug: true})