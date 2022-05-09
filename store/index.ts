import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import { AnyAction, applyMiddleware, legacy_createStore as createStore } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { reducer, RootState } from "./reducers";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

const makeStore: MakeStore<RootState> = (context: Context) => createStore(reducer, applyMiddleware(thunk));

export const wrapper = createWrapper<RootState>(makeStore, {debug: true})

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>