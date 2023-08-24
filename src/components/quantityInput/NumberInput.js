import React from 'react';
import { Form } from 'react-bootstrap';

const NumberInput = ({ value, onChange }) => {
  return (
    <Form.Control
      type="number"
      min={1}
      max={99}
      value={value}
      onChange={onChange}
    />
  );
};

export default NumberInput;
