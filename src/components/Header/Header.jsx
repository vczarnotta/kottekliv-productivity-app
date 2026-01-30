import "./Header.css"
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import menuItems from "./navData"

/**
 * @param {Function} changePage - Function from App.jsx to update the page state
 * @param {string} activePage - The title of the currently active page
 */
function Header ({changePage, activePage}) {

  return (
    <header>
      <div className="main-part">
        <h1>Project Name</h1>
        
        <nav>
          <ul>
              {menuItems.map((item) => (
                <li
                  key={item.title}
                  /* Adds the "active" class if the item matches the current page */
                  className={activePage === item.title ? "active" : ""}
                >
                  {/* Calls changePage to switch views in the main component when clicked */}
                  <a onClick={ () => changePage(item.title)}>
                    <span className="icon">{item.icon}</span>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </div>
      
      <div className="theme-part">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;