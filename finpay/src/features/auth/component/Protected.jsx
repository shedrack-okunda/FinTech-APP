import { useSelector } from "react-redux";
import { SelectLoggedInUser } from "../AuthSlice";
import { Navigate } from "react-router";

export const Protected = ({ children }) => {
  const loggedInUser = useSelector(SelectLoggedInUser);

  if (loggedInUser?.isVerified) {
    return children;
  }

  return <Navigate to={"/login"} replace={true} />;
};
