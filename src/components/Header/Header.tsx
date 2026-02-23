import { NavLink } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import menuItems from "./navData"
import "./Header.css"

function Header() {

  return (
    <header>
      <div className="main-part">
        <h1>Kottekliv logo</h1>
        
        <nav>
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              /* Adds the "active" class if the item matches the current page */
              className={({ isActive }) => (isActive ? "active nav-item" : "nav-item")}
            >
              {/* Calls changePage to switch views in the main component when clicked */}
              <span className="icon">{item.icon}</span>
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="theme-part">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;