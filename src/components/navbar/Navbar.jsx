import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";
import { GoHome } from "react-icons/go";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) {
    fetch();
  }

  const user = true;
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <GoHome style={{fontSize: 35, color:"white", backgroundColor:"#e4002b", borderRadius: 30, padding: 5}}/>
          <span>EstateEase</span>
        </a>
        <a href="/">Home</a>
        <a href="/list">Property</a>
        <a href="/list?type=rent">Rent</a>
        <a href="/list?type=buy">Buy</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={currentUser.avatar || "/noavatar.jpg"}
              alt=""
            />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="registerBtn">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/list">Property</a>
          <a href="/list?type=buy">Buy</a>
          <a href="/list?type=rent">Rent</a>
          <a href="/login">Sign in</a>
          <a href="/register">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
