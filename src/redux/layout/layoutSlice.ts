// myredux/layout/layoutSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LayoutState {
    layoutColor: string;
    layoutType: string;
    layoutWidth: string;
    menuPosition: string;
    leftSideBarTheme: string;
    leftSideBarType: string;
    showSidebarUserInfo: boolean;
    topbarTheme: string;
}

const initialState: LayoutState = {
    layoutColor: 'default',
    layoutType: 'vertical',
    layoutWidth: 'fluid',
    menuPosition: 'fixed',
    leftSideBarTheme: 'light',
    leftSideBarType: 'default',
    showSidebarUserInfo: true,
    topbarTheme: 'light',
};

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setLayoutColor(state, action: PayloadAction<string>) {
            state.layoutColor = action.payload;
        },
        setLayoutWidth(state, action: PayloadAction<string>) {
            state.layoutWidth = action.payload;
        },
        setMenuPosition(state, action: PayloadAction<string>) {
            state.menuPosition = action.payload;
        },
        setLeftSideBarTheme(state, action: PayloadAction<string>) {
            state.leftSideBarTheme = action.payload;
        },
        setLeftSideBarType(state, action: PayloadAction<string>) {
            state.leftSideBarType = action.payload;
        },
        setShowSidebarUserInfo(state, action: PayloadAction<boolean>) {
            state.showSidebarUserInfo = action.payload;
        },
        setTopbarTheme(state, action: PayloadAction<string>) {
            state.topbarTheme = action.payload;
        },
    },
});

export const {
    setLayoutColor,
    setLayoutWidth,
    setMenuPosition,
    setLeftSideBarTheme,
    setLeftSideBarType,
    setShowSidebarUserInfo,
    setTopbarTheme,
} = layoutSlice.actions;

export default layoutSlice.reducer;
