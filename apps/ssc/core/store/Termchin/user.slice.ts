import { createSlice } from "@reduxjs/toolkit";
import { Lesson, TALesson, Universities } from "./types";

type TermchinState = {
  university?: Universities;
  faculty?: string;
  lessons: Lesson[];
  taLessons: TALesson[];
};

const defaultState: TermchinState = {
  lessons: [],
  taLessons: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {},
  extraReducers: (_builder) => {},
});

export const user = userSlice.actions;
