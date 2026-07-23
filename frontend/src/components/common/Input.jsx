import React from 'react';

export const Input = ({ label, id, name, type = 'text', value, onChange, placeholder, required, ...props }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id || name}>{label}</label>}
      <input
        id={id || name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        {...props}
      />
    </div>
  );
};

export default Input;
