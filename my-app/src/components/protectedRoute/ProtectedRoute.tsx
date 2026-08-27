import {Navigate, Outlet, useLocation} from "react-router";
import {RouterEnum} from "@/config/RouterEnum.ts";
import {AuthService} from "@/screens/auth/services/auth.service.ts";

const ProtectedRoute = () => {
    const location = useLocation();
    const session = AuthService.getStoredSession();

    if (!session?.access_token) {
        return <Navigate to={RouterEnum.LOGIN} replace state={{from: location}} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
