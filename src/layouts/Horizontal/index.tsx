import React, { Suspense, useEffect, useState } from 'react';
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

// actions

// constants
import { LayoutTypes, TopbarTheme } from '../../constants/layout';

// hooks
import { useRedux } from '../../hooks';

// utils
import { changeBodyAttribute } from '../../utils';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Topbar = React.lazy(() => import('../Topbar'));
const Navbar = React.lazy(() => import('./Navbar'));
const Footer = React.lazy(() => import('../Footer'));
const RightSidebar = React.lazy(() => import('../RightSidebar'));

const loading = () => <div className="text-center"></div>;

type HorizontalLayoutProps = {
    children?: any;
};

const HorizontalLayout = ({ children }: HorizontalLayoutProps) => {
    const { dispatch, appSelector } = useRedux();

    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

    /*
    layout defaults
    */

    /**
     * Open the menu when having mobile screen
     */
    const openMenu = () => {
        setIsMenuOpened(!isMenuOpened);
        if (document.body) {
            if (isMenuOpened) {
                document.body.classList.remove('sidebar-enable');
            } else {
                document.body.classList.add('sidebar-enable');
            }
        }
    };

    return (
        <>
            <div id="wrapper">
                <Suspense fallback={loading()}>
                    <Topbar openLeftMenuCallBack={openMenu} containerClass="container-fluid" />
                </Suspense>

                <Suspense fallback={loading()}>
                    <Navbar isMenuOpened={isMenuOpened} />
                </Suspense>
                <div className="content-page">
                    <div className="content">
                        <Container fluid>
                            <Row>
                                <Col xs={12}>
                                    <div className="page-title-box">
                                        <div className="page-title-right">
                                            <Breadcrumb className="m-0">
                                                <Breadcrumb.Item href="/">Adminto</Breadcrumb.Item>

                                                {[].map(
                                                    (
                                                        item: {
                                                            label: string;
                                                            path: string;
                                                            active?: boolean;
                                                        },
                                                        index: React.Key
                                                    ) => {
                                                        return item.active ? (
                                                            <Breadcrumb.Item active key={index.toString()}>
                                                                {item.label}
                                                            </Breadcrumb.Item>
                                                        ) : (
                                                            <Breadcrumb.Item key={index.toString()} href={item.path}>
                                                                {item.label}
                                                            </Breadcrumb.Item>
                                                        );
                                                    }
                                                )}
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Outlet />
                        </Container>
                    </div>

                    <Suspense fallback={loading()}>
                        <Footer />
                    </Suspense>
                </div>
            </div>
        </>
    );
};

export default HorizontalLayout;
