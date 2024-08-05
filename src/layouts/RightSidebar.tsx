import { useCallback, useEffect, useRef } from 'react';
import { Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// actions

// hooks
import { useRedux } from '../hooks/';

// components
import Scrollbar from '../components/Scrollbar';
import ThemeCustomizer from '../components/ThemeCustomizer';

const RightSidebar = () => {
    const { dispatch, appSelector } = useRedux();
    const rightBarNodeRef: any = useRef(null);

    /**
     * Handles the close
     */

    /**
     * Handle the click anywhere in doc
     */

    return (
        <>
            <div className="right-bar" ref={rightBarNodeRef}>
                <Scrollbar style={{ maxHeight: '100%', zIndex: 10000 }} className="h-100">
                    <div className="rightbar-title">
                        <Link to="#" className="right-bar-toggle float-end">
                            <i className="mdi mdi-close"></i>
                        </Link>
                        <h4 className="font-16 m-0 text-white">Theme Customizer</h4>
                    </div>

                    <Tab.Content className="pt-0">
                        <Tab.Pane active eventKey="themecustomizer">
                            <ThemeCustomizer />
                        </Tab.Pane>
                    </Tab.Content>
                </Scrollbar>
            </div>
            <div className="rightbar-overlay"></div>
        </>
    );
};

export default RightSidebar;
