import { useNavigate, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

function PrivateRoutes() {
  const [isLoading, setIsLoading] = useState(true);
  const [userAuth, setUserAuth] = useState(false);

  let navigate = useNavigate();

  const auth = async () => {
    if (!currentUser) {
      navigate("/notfound", { replace: true });
    }
    await axios
      .get(`http://localhost:3000/api/auth/profile/${currentUser._id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        setUserAuth(true);
        setIsLoading(false);
      })
      .catch(function (err) {
        console.error(`Retour du serveur : ${err}`);
        setUserAuth(false);
        navigate("/notfound", { replace: true });
      });
  };

  useEffect(
    () => {
      auth();
    },
    // eslint-disable-next-line
    [isLoading]
  );

  if (isLoading) {
    return <div className="loader loader-spin">Loading...</div>;
  }

  return userAuth ? <Outlet /> : <Navigate to="/notfound" replace />;
}

export default PrivateRoutes;
