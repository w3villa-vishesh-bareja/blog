import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, onClick, disabled, className }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
        >
            {label}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

Button.defaultProps = {
    disabled: false,
    className: '',
};

export default Button;