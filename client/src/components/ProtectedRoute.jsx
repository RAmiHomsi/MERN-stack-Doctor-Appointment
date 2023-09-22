import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { showLoading, hideLoading } from "../redux/alertsSlice";

export default function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        "http://localhost:8000/user/userbyid",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      dispatch(setUser(data));
    } catch (error) {
      dispatch(hideLoading());
      return <Navigate to="/login" />;
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
