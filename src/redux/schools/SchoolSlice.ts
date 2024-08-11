import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Corrected School type declaration
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
    schools: School[];
    loading: boolean;
    error: string | null;
};

const initialState: SchoolState = {
    schools: [],
    loading: false,
    error: null,
};

const schoolSlice = createSlice({
    name: 'school',
    initialState,
    reducers: {
        fetchSchoolsStart: (state) => {
            state.loading = true;
        },
        fetchSchoolsSuccess: (state, action: PayloadAction<School[]>) => {
            state.schools = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchSchoolsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        addSchoolStart: (state) => {
            state.loading = true;
        },
        addSchoolSuccess: (state, action: PayloadAction<School>) => {
            state.schools?.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        addSchoolFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateSchoolStart: (state) => {
            state.loading = true;
        },
        updateSchoolSuccess: (state, action: PayloadAction<School>) => {
            if (state.schools) {
                const index = state.schools.findIndex((school) => school.id === action.payload.id);
                if (index !== -1) {
                    state.schools[index] = action.payload;
                }
            }
            state.loading = false;
            state.error = null;
        },
        updateSchoolFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteSchoolStart: (state) => {
            state.loading = true;
        },
        deleteSchoolSuccess: (state, action: PayloadAction<string>) => {
            if (state.schools) {
                state.schools = state.schools.filter((school) => school.id !== action.payload);
            }
            state.loading = false;
            state.error = null;
        },
        deleteSchoolFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    fetchSchoolsStart,
    fetchSchoolsSuccess,
    fetchSchoolsFailure,
    addSchoolStart,
    addSchoolSuccess,
    addSchoolFailure,
    updateSchoolStart,
    updateSchoolSuccess,
    updateSchoolFailure,
    deleteSchoolStart,
    deleteSchoolSuccess,
    deleteSchoolFailure,
} = schoolSlice.actions;

export default schoolSlice.reducer;
