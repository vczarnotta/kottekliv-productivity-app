import "./Header.css"
import menuItems from "./navData"

/* Kanske lägga till visuell effekt för aktiva sidan? */

function Header ({changePage}) {

  return (
    <header>
        <h1>Projektnamn</h1>
        
        <nav>
          <ul>
              {/* Gå igenom arrayen och mappa ut */}
              {menuItems.map((item) => (
                <li key={item.title}>
                  <a onClick={ () => changePage(item.title)}>
                    <span className="icon">{item.icon}</span>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
          </ul>
        </nav>
    </header>
  );
}

export default Header;