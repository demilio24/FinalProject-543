import React, { useEffect } from "react";
import HeaderDrawer from "./components/header";
import AddNote from "./components/Tasks";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./components/auth/login";
import { addUser } from "./store/slices/user.slice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    userSlice: { user },
  } = useSelector((state) => state);
  useEffect(() => {
   
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      dispatch(addUser(parsedUserData));
    }
  }, [dispatch]);
  return (
    <div>
      <HeaderDrawer>
        <Routes>
          <Route
            path="/"
            element={user && user.name ? <AddNote /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </HeaderDrawer>
    </div>
  );
};

export default App;

// const notes = [
//   {
// id:uuid
//     taskText: "",
//     date: "",
//     status: "",
//     progress: 0,
//     assign: [],
//     collaborators: [],
//   },
// ];
