import React from 'react';

export const Header = props => {
    return <div className="card-header">{props.children}</div>
}

export const Body = props => {
    return (
        <div className="col-12">
            <div className="card-body">{props.children}</div>
        </div>
    );
}

