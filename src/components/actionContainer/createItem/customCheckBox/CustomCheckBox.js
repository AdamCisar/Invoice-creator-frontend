import React from 'react';
import "./CustomCheckBox.css";

const CustomCheckbox = ({ label, isChecked, setIsChecked }) => {

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={isChecked}
          onChange={toggleCheckbox}
          id="flexCheckDefault"
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          {label}
        </label>
    </div>
  );
};

export default CustomCheckbox;
