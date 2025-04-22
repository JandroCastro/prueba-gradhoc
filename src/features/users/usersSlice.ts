import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { User } from './usersTypes';
import { fetchUsers } from './usersAPI';


interface UsersState {
  allUsersById: Record<string, User>;
  allUsersList: string[];
  visibleUserIds: string[];
  deletedUserIds: string[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  allUsersById: {},
  allUsersList: [],
  visibleUserIds: [],
  deletedUserIds: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    removeUser: (state, action) => {
      state.visibleUserIds = state.visibleUserIds.filter(id => id !== action.payload);
      state.deletedUserIds.push(action.payload)
    },
    resetUsers: (state) => {
      state.deletedUserIds = [];
      state.visibleUserIds = [...state.allUsersList];
    },
    resetToVisibleUsers: (state) => {
       state.visibleUserIds 
    },
    filterByCountry: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase().trim();
      state.visibleUserIds = state.visibleUserIds.filter(id => {
        const user = state.allUsersById[id];
        return user.country.toLowerCase().includes(query);
      });
    },
    clearCountryFilter: (state) => {
      state.visibleUserIds = state.allUsersList.filter(
        id => !state.deletedUserIds.includes(id)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allUsersById = action.payload.allUsersById;
        state.allUsersList = action.payload.allUsersList;
        state.visibleUserIds = action.payload.allUsersList;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching users';
      });
  },
});

export const { removeUser, resetUsers, filterByCountry, resetToVisibleUsers, clearCountryFilter } = usersSlice.actions;

export default usersSlice.reducer;
