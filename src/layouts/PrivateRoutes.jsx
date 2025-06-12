import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../pages/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    if(loading){
        return(
            <Loading></Loading>
        );
    }
    const location = useLocation();
    if(user && user?.email)
        return children;
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoutes;