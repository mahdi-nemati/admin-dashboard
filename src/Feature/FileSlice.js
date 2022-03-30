import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// get all Article
export const getAsyncArticle = createAsyncThunk(
  "Article/getAsyncArticle",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:3001/Article");
      return data;
    } catch (error) {
      return rejectWithValue([], error.message);
    }
  }
);
// get one Article
export const getOneAsyncArticle = createAsyncThunk(
  "Article/getOneAsyncArticle",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/article/${payload}`
      );
      return data;
    } catch (error) {
      return rejectWithValue([], error.message);
    }
  }
);
// post data
export const postAsyncArticle = createAsyncThunk(
  "Article/postAsyncArticle",
  async (payload, { rejectWithValue }) => {
    try {
      //must be full
    } catch (error) {
      return rejectWithValue([], error.message);
    }
  }
);
// delete data
export const deleteAsyncArticle = createAsyncThunk(
  "contact/deleteAsyncArticle",
  async (payload, { rejectWithValue }) => {
    try {
      // must be complete !
    } catch (error) {
      return rejectWithValue([], error.message);
    }
  }
);
// put data

///////must be complate !

// initial
const initialState = {
  Article: [],
  error: null,
  loading: false,
};
const ArticleSlice = createSlice({
  name: "Article",
  initialState,
  extraReducers: {
    // get all article actions
    [getAsyncArticle.fulfilled]: (state, action) => {
      return { ...state, error: null, loading: false, Article: action.payload };
    },
    [getAsyncArticle.pending]: (state, action) => {
      return { ...state, error: null, loading: true, Article: [] };
    },
    [getAsyncArticle.rejected]: (state, action) => {
      return { ...state, error: action.error, loading: false, Article: [] };
    },
    // get one article actions
    [getOneAsyncArticle.fulfilled]: (state, action) => {
      return { ...state, error: null, loading: false, Article: action.payload };
    },
    [getOneAsyncArticle.pending]: (state, action) => {
      return { ...state, error: null, loading: true, Article: [] };
    },
    [getOneAsyncArticle.rejected]: (state, action) => {
      return { ...state, error: action.error, loading: false, Article: [] };
    },
  },
});
export default ArticleSlice.reducer;
