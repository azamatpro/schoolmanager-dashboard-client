import { useState, useEffect, useCallback } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
    setLayoutColor,
    setLayoutWidth,
    setMenuPosition,
    setLeftSideBarTheme,
    setLeftSideBarType,
    setShowSidebarUserInfo,
    setTopbarTheme,
} from '../../redux/layout/layoutSlice'; // adjust the path as necessary

import * as layoutConstants from '../../constants/layout';

import LayoutTypes from './LayoutTypes';
import LayoutColor from './LayoutColor';
import LayoutWidth from './LayoutWidth';
import MenuPositions from './MenuPositions';
import LeftSideBarTheme from './LeftSideBarTheme';
import LeftSideBarType from './LeftSideBarType';
import SidebarUserInfo from './SidebarUserInfo';
import TopbarTheme from './TopbarTheme';
import { RootState } from '../../redux/store';

const ThemeCustomizer = () => {
    const dispatch = useDispatch();
    const width = window.innerWidth;

    const {
        layoutColor,
        layoutType,
        layoutWidth,
        menuPosition,
        leftSideBarTheme,
        leftSideBarType,
        showSidebarUserInfo,
        topbarTheme,
    } = useSelector((state: RootState) => state.layout);

    const [disableTopbarTheme, setDisableTopbarTheme] = useState<boolean>(false);
    const [disableSidebarTheme, setDisableSidebarTheme] = useState<boolean>(false);
    const [disableSidebarType, setDisableSidebarType] = useState<boolean>(false);
    const [disableSidebarUser, setDisableSidebarUser] = useState<boolean>(false);

    const _loadStateFromProps = useCallback(() => {
        setDisableTopbarTheme(layoutColor !== layoutConstants.LayoutColor.LAYOUT_COLOR_DARK);
        setDisableSidebarTheme(layoutType !== layoutConstants.LayoutTypes.LAYOUT_HORIZONTAL);
        setDisableSidebarType(layoutType !== layoutConstants.LayoutTypes.LAYOUT_HORIZONTAL && width > 991);
        setDisableSidebarUser(layoutType !== layoutConstants.LayoutTypes.LAYOUT_HORIZONTAL);
    }, [layoutColor, layoutType, width]);

    useEffect(() => {
        _loadStateFromProps();
    }, [_loadStateFromProps]);

    const changeLayoutType = (value: string) => {
        var layout = value;
        switch (layout) {
            case 'horizontal':
                dispatch(changeLayoutType(layoutConstants.LayoutTypes.LAYOUT_HORIZONTAL));
                break;
            default:
                dispatch(changeLayoutType(layoutConstants.LayoutTypes.LAYOUT_VERTICAL));
                break;
        }
    };

    const changeLayoutColorScheme = (value: string) => {
        dispatch(
            setLayoutColor(
                value === 'dark'
                    ? layoutConstants.LayoutColor.LAYOUT_COLOR_DARK
                    : layoutConstants.LayoutColor.LAYOUT_COLOR_LIGHT
            )
        );
    };

    const changeWidthMode = (value: string) => {
        dispatch(
            setLayoutWidth(
                value === 'boxed'
                    ? layoutConstants.LayoutWidth.LAYOUT_WIDTH_BOXED
                    : layoutConstants.LayoutWidth.LAYOUT_WIDTH_FLUID
            )
        );
    };

    const changeMenuPosition = (value: string) => {
        dispatch(
            setMenuPosition(
                value === 'scrollable'
                    ? layoutConstants.MenuPositions.MENU_POSITION_SCROLLABLE
                    : layoutConstants.MenuPositions.MENU_POSITION_FIXED
            )
        );
    };

    const changeLeftSidebarTheme = (value: string) => {
        dispatch(
            setLeftSideBarTheme(
                value === 'dark'
                    ? layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_DARK
                    : value === 'brand'
                    ? layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_BRAND
                    : value === 'gradient'
                    ? layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_GRADIENT
                    : layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT
            )
        );
    };

    const changeLeftSiderbarType = (value: string) => {
        dispatch(
            setLeftSideBarType(
                value === 'condensed'
                    ? layoutConstants.SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED
                    : value === 'compact'
                    ? layoutConstants.SideBarTypes.LEFT_SIDEBAR_TYPE_COMPACT
                    : layoutConstants.SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT
            )
        );
    };

    const toggleLeftSidebarUserInfo = (value: boolean) => {
        dispatch(setShowSidebarUserInfo(value));
    };

    const changeTopBarTheme = (value: string) => {
        dispatch(
            setTopbarTheme(
                value === 'light'
                    ? layoutConstants.TopbarTheme.TOPBAR_THEME_LIGHT
                    : layoutConstants.TopbarTheme.TOPBAR_THEME_DARK
            )
        );
    };

    const reset = () => {
        changeLayoutType(layoutConstants.LayoutTypes.LAYOUT_VERTICAL);
        changeLayoutColorScheme(layoutConstants.LayoutColor.LAYOUT_COLOR_LIGHT);
        changeWidthMode(layoutConstants.LayoutWidth.LAYOUT_WIDTH_FLUID);
        changeMenuPosition(layoutConstants.MenuPositions.MENU_POSITION_FIXED);
        changeLeftSidebarTheme(layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT);
        toggleLeftSidebarUserInfo(true);
        changeTopBarTheme(layoutConstants.TopbarTheme.TOPBAR_THEME_LIGHT);
        changeLeftSiderbarType(layoutConstants.SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT);
    };

    return (
        <div className="p-3">
            <Alert variant="warning">
                <strong>Customize </strong> the overall color scheme, Layout, etc.
            </Alert>

            <LayoutTypes
                changeLayoutType={changeLayoutType}
                layoutType={layoutType}
                layoutConstants={layoutConstants.LayoutTypes}
            />
            <LayoutColor
                changeLayoutColorScheme={changeLayoutColorScheme}
                layoutColor={layoutColor}
                layoutConstants={layoutConstants.LayoutColor}
            />
            <LayoutWidth
                changeWidthMode={changeWidthMode}
                layoutWidth={layoutWidth}
                layoutConstants={layoutConstants.LayoutWidth}
            />
            <MenuPositions
                menuPosition={menuPosition}
                changeMenuPosition={changeMenuPosition}
                layoutConstants={layoutConstants.MenuPositions}
            />

            {disableSidebarTheme && (
                <LeftSideBarTheme
                    changeLeftSidebarTheme={changeLeftSidebarTheme}
                    leftSideBarTheme={leftSideBarTheme}
                    layoutConstants={layoutConstants.SideBarTheme}
                />
            )}
            {disableSidebarType && (
                <LeftSideBarType
                    changeLeftSiderbarType={changeLeftSiderbarType}
                    leftSideBarType={leftSideBarType}
                    layoutConstants={layoutConstants.SideBarTypes}
                />
            )}
            {disableSidebarUser && (
                <SidebarUserInfo
                    toggleLeftSidebarUserInfo={toggleLeftSidebarUserInfo}
                    showSidebarUserInfo={showSidebarUserInfo}
                />
            )}
            {disableTopbarTheme && (
                <TopbarTheme
                    changeTopBarTheme={changeTopBarTheme}
                    topbarTheme={topbarTheme}
                    layoutConstants={layoutConstants.TopbarTheme}
                />
            )}

            <div className="d-grid mt-4">
                <Button id="resetBtn" onClick={reset}>
                    Reset to Default
                </Button>
            </div>
        </div>
    );
};

export default ThemeCustomizer;
