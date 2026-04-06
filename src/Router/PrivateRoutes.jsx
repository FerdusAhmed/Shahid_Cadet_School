import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import NexusLoader from '../components/Nexusloader/Nexusloader';



const PrivateRoutes = ({children}) => {
    const {user,loading} = useAuth();
    const location =useLocation()
    if(loading){
        return <NexusLoader></NexusLoader>
    }
    if(!user){
        return <Navigate state={{ from: location }} replace to="/login"></Navigate>
    }
    return children
};

export default PrivateRoutes;