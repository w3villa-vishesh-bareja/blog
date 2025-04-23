import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, name, value, onChange, placeholder, className, ...rest }) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            {...rest}
        />
    );
};


Input.defaultProps = {
    type: 'text',
    placeholder: '',
    className: '',
};

export default Input;