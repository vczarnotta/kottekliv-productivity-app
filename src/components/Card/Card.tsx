import './Card.css'

interface CardProps { 
  children: React.ReactNode,
  title?: React.ReactNode,
  span?: number,
  onClick?: () => void
}

function Card({ children, title, span = 1, onClick }: CardProps) {

  const addSpan: React.CSSProperties = {
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
        {children}
      </div>

    </div>
  )
}

export default Card