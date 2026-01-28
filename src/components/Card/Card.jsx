import './Card.css'

/**
 * @param {string} title - The title of the card
 * @param {number} span - Number of columns the card should occupy (default 1)
 * @param {function} onClick - Function to execute if the card is clickable
 */
const Card = ({ children, title, span = 1, onClick }) => {

  const addSpan = {
    gridColumn: `span ${span}`
  }

  return (
    <div
    className={onClick ? "card-base is-clickable" : "card-base"}
    style={addSpan}
    onClick={onClick}
    role={onClick ? "button" : undefined}
    >

      {/* Render h2 if title exists */}
      {title && <h2 className="card-title">{title}</h2>}

      <div className="card-content">
        {/* Accepts children for custom content */}
        {children}
      </div>

    </div>
  );
};

export default Card