import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleUserName } from "../features/user/userSlice";

function useAuthChecked() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const storedUsername = localStorage.getItem("auth");
    if (storedUsername) {
      dispatch(handleUserName(storedUsername));
    }
    setAuthChecked(true);
  }, []);

  return authChecked;
}

export default useAuthChecked;
