import './Card.css'

/**
 * @param {string} title - Rubriken på kortet.
 * @param {number} span - Hur många kolumner kortet ska ta upp (default 1).
 */
const Card = ({ children, title, span = 1 }) => {

  const addSpan = {
    gridColumn: `span ${span}`
  }

  return (
    <div
    className={"card-base"}
    style={addSpan}
    >

      {/* Om titel finns, skapa h2 */}
      {title && <h2 className="card-title">{title}</h2>}

      <div className="card-content">
        {/* Tar emot children för att kunna anpassa innehållet */}
        {children}
      </div>

    </div>
  );
};

export default Card