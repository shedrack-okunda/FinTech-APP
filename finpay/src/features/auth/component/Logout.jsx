/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync, SelectLoggedInUser } from "../AuthSlice";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(SelectLoggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutAsync());
  }, []);

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [loggedInUser]);

  return <></>;
};
