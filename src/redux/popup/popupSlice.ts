import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Popup = {
    agree: boolean;
};

export type PopupState = {
    agree: boolean;
};

const initialState: PopupState = {
    agree: false,
};

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setAgree: (state, action: PayloadAction<boolean>) => {
            state.agree = action.payload;
        },
    },
});

export const { setAgree } = popupSlice.actions;
export default popupSlice.reducer;
