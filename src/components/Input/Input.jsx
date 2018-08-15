import React from 'react';
import PropTypes from 'prop-types';

const Input = props => {

    return (
        <div>
            <div className="row">
                <div className="col-lg-4 field-label-responsive">
                    <label htmlFor={props.myInput}>{props.labelMessage}</label>
                </div>
                <div className="col-lg-8">
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-addon" style={{ width: "2.6rem" }}><i className={props.icon}></i></div>
                            <input
                                disabled={props.isDisabled}
                                type={props.myInput}
                                name={props.myInput}
                                className={"form-control"}
                                id={props.inputId}
                                placeholder={props.inputHolder}
                                value={props.inputValue || ''}
                                onChange={props.onInputChange}
                            />

                        </div>
                        <div className="">{props.children}</div>
                    </div>
                </div>
            </div>
            
        </div>

    );
}

Input.propTypes = {
    myInput: PropTypes.string.isRequired,
    inputId: PropTypes.string.isRequired,
    labelMessage: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired
}

export default Input;