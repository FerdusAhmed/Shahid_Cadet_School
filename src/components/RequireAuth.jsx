import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
    const auth = useContext(AuthContext);
    const loading = auth?.loading;
    const user = auth?.user;
    const location = useLocation();

    if (loading) {
        // you can render a spinner or skeleton here
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-gray-500">Checking authentication...</p>
            </div>
        );
    }

    if (!user) {
        // redirect to login and preserve the current location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
