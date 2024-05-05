import "./layout.scss";
import Navbar from "../../components/navbar/Navbar"
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Layout() {
  return (
    <div>
      <Navbar />
      <div className="layout">
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function RequireAuth() {

  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <Navbar />
      <div className="layout">
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export { RequireAuth, Layout };
