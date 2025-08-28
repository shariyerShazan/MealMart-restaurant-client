// PrivateRoute.tsx
import React,{ type ReactNode }  from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../hooks/useReduxTypeHooks";
import { toast } from "react-toastify";

interface Props {
  children?: ReactNode;
  redirectPath?: string;
}

const PrivateRoute: React.FC<Props> = ({ children, redirectPath = "/login" }) => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!user?.admin) {
    toast("Unauthorized Access");
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default PrivateRoute;
