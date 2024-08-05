import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
    id: number;
    password: string;
    is_deleted: boolean;
    deleted_at: string | null;
    token: string;
    username: string;
    created_at: string;
    updated_at: string;
};

export type UserState = {
    currentUser: User | null;
    loading: boolean;
    error: string | null;
};

const initialState: UserState = {
    currentUser: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutUserFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
