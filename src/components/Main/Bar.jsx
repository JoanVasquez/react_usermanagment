import React from 'react';
import Button from '../Button/Button.jsx';

const Bar = props => {
    return (
        <div className="input-group">
            <input type="text" className="form-control" placeholder="Search" />
            <span className="input-group-btn mx-2">
                <Button type="button" btnClass="btn btn-light" msg="Logout" onClick={props.click}/>
            </span>
        </div>
    );
}

export default Bar;