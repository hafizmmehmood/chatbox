import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

export const userLogin = createAsyncThunk(
  'user/userLogin',
  async (formData, { rejectWithValue }) => {
    try {
        const response = await instance.post('/auth/login', formData);
        if (response.data && response.data.code === 200) {
            return response.data;
        } else {
            rejectWithValue(response.data);
        }
    } catch (err) {
      return rejectWithValue(
        err.response && err.response.data ? err.response.data : err.message
      );
    }
  }
);