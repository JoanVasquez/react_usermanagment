import React from 'react';
import PropTypes from 'prop-types';

const Panel = props => {
    return(
        <div className={`card ${props.headerType}`}>
            <div className="card-header">{props.headerMessage}</div>
            <div className="card-body">
                {props.children}
            </div>
        </div>
    );
}

Panel.propTypes = {
    headerType: PropTypes.string.isRequired,
    headerMessage: PropTypes.string.isRequired
}

export default Panel;