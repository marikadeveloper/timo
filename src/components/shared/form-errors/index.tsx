import React from 'react';
import './styles.scss';

type FormErrorsProps = {
  errors: string[];
};

const FormErrors: React.FC<FormErrorsProps> = ({ errors }) => {
  return (
    <ul className='form-errors'>
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
};

export default FormErrors;
