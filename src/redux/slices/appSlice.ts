import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  isSidebarOpen: boolean;
  globalLoading: boolean;
}

const initialState: AppState = {
  isSidebarOpen: false,
  globalLoading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setGlobalLoading } = appSlice.actions;

export default appSlice.reducer;
