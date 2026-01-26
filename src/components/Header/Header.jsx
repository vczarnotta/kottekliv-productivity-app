import "./Header.css"
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import menuItems from "./navData"

/**
 * @param {Function} changePage - Funktion från App.jsx för att uppdatera sid-state
 * @param {string} activePage - Den nuvarande aktiva sidans titel
 */
function Header ({changePage, activePage}) {

  return (
    <header>
      <div className="main-part">
        <h1>Projektnamn</h1>
        
        <nav>
          <ul>
              {menuItems.map((item) => (
                <li
                  key={item.title}
                  /* Sätter klassen "active" om knappen matchar nuvarande sida */
                  className={activePage === item.title ? "active" : ""}
                >
                  {/* Vid klick anropas changePage för att byta vy i huvudkomponenten */}
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