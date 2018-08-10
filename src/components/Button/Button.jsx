import React from 'react';

const Button = props => {
    return <button type={props.type} className={props.btnClass} disabled={props.isValid === false}>{props.msg}</button>;
}

export default Button;