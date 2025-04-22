import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from './usersTypes';

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://randomuser.me/api/?results=100');
    const data = await response.json();
    return data.results;
  }
);
