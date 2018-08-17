import React from 'react';
import Button from '../Button/Button.jsx';

const Bar = props => {
    return (
        <div className="input-group">
            <input type="text" 
                    className="form-control" 
                    name="filterText" 
                    placeholder="Search" 
                    value={props.filter} 
                    onChange={event => props.setFilter(event.target.value)} />
            <span className="input-group-btn mx-2">
                <Button type="button" btnClass="btn btn-light" msg="Logout" click={props.onLogout}/>
            </span>
        </div>
    );
}

export default Bar;