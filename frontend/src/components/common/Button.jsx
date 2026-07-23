import React from 'react';

export const Button = ({ children, className = '', disabled, type = 'button', onClick, ...props }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`custom-btn ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
