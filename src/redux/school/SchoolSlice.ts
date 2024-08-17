import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type School = {
    id: string;
    name: string;
    phone_number: string;
    address: string;
    owner_id: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};

export type SchoolState = {
    school: null | School;
};

const initialState: SchoolState = {
    school: null,
};

const schoolSlice = createSlice({
    name: 'school',
    initialState,
    reducers: {
        setSchool: (state, action: PayloadAction<School>) => {
            state.school = action.payload;
        },
    },
});

export const { setSchool } = schoolSlice.actions;

export default schoolSlice.reducer;
