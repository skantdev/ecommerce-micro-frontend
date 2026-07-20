import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface NotificationsState {
  items: Notification[];
}

const initialState: NotificationsState = {
  items: [],
};

/**
 * Notifications slice - Manage toast notifications
 * 
 * Stores notification queue for displaying toasts/snackbars
 */
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // Add notification
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const id = `notification-${Date.now()}-${Math.random()}`;
      state.items.push({
        ...action.payload,
        id,
      });
    },

    // Remove notification
    removeNotification: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((n) => n.id !== action.payload);
    },

    // Clear all notifications
    clearNotifications: (state) => {
      state.items = [];
    },

    // Convenience actions
    success: (state, action: PayloadAction<{ message: string; duration?: number }>) => {
      const id = `notification-${Date.now()}-${Math.random()}`;
      state.items.push({
        id,
        message: action.payload.message,
        type: 'success',
        duration: action.payload.duration,
      });
    },

    error: (state, action: PayloadAction<{ message: string; duration?: number }>) => {
      const id = `notification-${Date.now()}-${Math.random()}`;
      state.items.push({
        id,
        message: action.payload.message,
        type: 'error',
        duration: action.payload.duration,
      });
    },

    warning: (state, action: PayloadAction<{ message: string; duration?: number }>) => {
      const id = `notification-${Date.now()}-${Math.random()}`;
      state.items.push({
        id,
        message: action.payload.message,
        type: 'warning',
        duration: action.payload.duration,
      });
    },

    info: (state, action: PayloadAction<{ message: string; duration?: number }>) => {
      const id = `notification-${Date.now()}-${Math.random()}`;
      state.items.push({
        id,
        message: action.payload.message,
        type: 'info',
        duration: action.payload.duration,
      });
    },
  },
});

export const {
  addNotification,
  removeNotification,
  clearNotifications,
  success,
  error,
  warning,
  info,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
