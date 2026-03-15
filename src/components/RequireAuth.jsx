import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children, allowedRoles = [] }) => {
    const auth = useContext(AuthContext);
    
    if (!auth) {
        return <div className="h-screen flex items-center justify-center text-red-600">Error: Authentication context not found</div>;
    }
    
    const { loading, user, role } = auth;
    const location = useLocation();

    console.log("RequireAuth Check:", { loading, user: user?.email, role, allowedRoles, path: location.pathname });

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-bold">Checking authentication...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        console.log("RequireAuth: No user found, redirecting to login");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        console.log("RequireAuth: User role not authorized", { userRole: role, allowedRoles });
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RequireAuth;
