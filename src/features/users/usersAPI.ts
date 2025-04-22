import { createAsyncThunk } from '@reduxjs/toolkit';
import { adaptUsers } from './usersAdapter';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const res = await fetch('https://randomuser.me/api/?results=100');
    const data = await res.json();
    return adaptUsers(data.results);
  }
);
