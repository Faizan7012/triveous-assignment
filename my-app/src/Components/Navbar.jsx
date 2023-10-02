import React, { useContext, useState } from "react";
import "./nav.css";
import { AuthContext } from "../context/Auth";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuth , setUser , toggleAuth , user } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const Logout = ()=>{
    setUser({});
    toggleAuth();
    setIsMenuOpen(false);
  }

  return (
    <nav>
      <div className="navbar-container">
        <div className="navbar-logo">TodayNews</div>
        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <a href="/" onClick={closeMenu}>
                Home
              </a>
            </li>
            <li>
              <a href="favorites" onClick={closeMenu}>
              Favorites
              </a>
            </li>
            {
              isAuth ? <>
               <li style={{cursor:'pointer'}}>
              <a onClick={Logout}>
                Logout
              </a>
            </li> 
                <li>
              <a>
                {user?.username}
              </a>
            </li></>
             :   <><li>
              <a href="/login" onClick={closeMenu}>
                Login
              </a>
            </li>
            <li>
              <a href="/signup" onClick={closeMenu}>
                Register
              </a>
            </li>
            
            </>
            }
          </ul>
        </div>
        <div className="navbar-toggle" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? "active" : ""}`} />
          <div className={`bar ${isMenuOpen ? "active" : ""}`} />
          <div className={`bar ${isMenuOpen ? "active" : ""}`} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
