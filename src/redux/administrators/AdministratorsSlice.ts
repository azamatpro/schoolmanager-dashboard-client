import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Administrator = {
    username: string;
    password: string;
    full_name: string;
    phone_number: string;
    passport_number: string;
    date_of_birth: string;
    gender: string;
    education: string;
    school_id: string;
    id: string;
    created_at: string;
    updated_at: string;
    is_deleted: string;
};

export type AdministratorsState = {
    administrators: Array<Administrator>;
    loading: boolean;
    error: string | null;
};

const initialState: AdministratorsState = {
    administrators: [],
    loading: false,
    error: null,
};

const administratorsSlice = createSlice({
    name: 'administrators',
    initialState,
    reducers: {
        getAdministratorsStart: (state) => {
            state.loading = true;
        },
        getAdministratorsSuccess: (state, action: PayloadAction<Array<Administrator>>) => {
            state.administrators = action.payload;
            state.loading = false;
            state.error = null;
        },
        getAdministratorsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { getAdministratorsStart, getAdministratorsSuccess, getAdministratorsFailure } =
    administratorsSlice.actions;
export default administratorsSlice.reducer;
