import { Navigate, useLocation } from 'react-router-dom';

// helpers
import { APICore } from '../helpers/api/apiCore';

// hooks
import { useUser } from '../hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getToken } from '../utils/authorization';

type PrivateRouteProps = {
    component: React.ComponentType;
    roles?: string;
};

/**
 * Private Route forces the authorization before the route can be accessed
 * @param {*} param0
 * @returns
 */
const PrivateRoute = ({ component: RouteComponent, roles, ...rest }: PrivateRouteProps) => {
    let location = useLocation();
    const { currentUser } = useSelector((state: RootState) => state.user);

    /**
     * not logged in so redirect to login page with the return url
     */
    if (!currentUser && !getToken('userToken')) {
        return <Navigate to={'/auth/login'} state={{ from: location }} replace />;
    }

    // check if route is restricted by role
    // if (roles && roles.indexOf(loggedInUser.role) === -1) {
    //     // role not authorised so redirect to home page
    //     return <Navigate to={{ pathname: '/' }} />;
    // }
    <Navigate to={{ pathname: '/' }} />;

    return <RouteComponent />;
};

export default PrivateRoute;
