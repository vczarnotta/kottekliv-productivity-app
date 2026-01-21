import React from 'react'
import './Cards.css'

const Card = ({ title, description, icon, size}) => {
  return (
    <div className={`card-base ${size}`}>
      {icon && <img src={icon} className={`card-icon-base ${iconClass}`} alt="icon" />}
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {description}
      </div>
    </div>
  );
};

export default Card