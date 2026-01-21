import React from 'react'
import './Input.css'


const Input = ({
  label, error,value, onChange, isDarkMode = false, placeholder, type = 'text', ...rest
}) => {
  
  const labelClassName = `inputLabel ${isDarkMode ? 'labelDark' : 'labelLight'}`;

  const inputClassName = `inputField ${
    isDarkMode ? 'inputDark' : 'inputLight'
  } ${error ? 'inputError' : ''}`;

  return(
    <div className = "inputContainer">
      {label && <label className = {labelClassName}>{label}</label>}
      <input 
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={inputClassName}
      {...rest} />

      {error && (<span className="errorText">{error}</span>)}
    </div>
  );
};

export default Input;