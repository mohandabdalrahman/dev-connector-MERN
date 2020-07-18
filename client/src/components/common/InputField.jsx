import React from 'react';

const InputField = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  smallText,
  minLength,
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        required
        value={value}
        minLength={minLength}
        onChange={onChange}
      />
      {smallText ? <small className="form-text">{smallText}</small> : ''}
    </div>
  );
};

export default InputField;
