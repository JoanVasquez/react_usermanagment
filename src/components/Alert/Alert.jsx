import React from 'react';

const Alert = props => {
    let msg = null;
    if (props.error) {
        msg = errorTemplate(props.serverError);
    }else {
        msg = props.message;
    }
    return (
        <div className={`alert ${props.alertClass} alert-dismissible fade show`} role="alert">
            
            <strong>{props.error ? 'Holy guacamole an error occurred: ' : 'great: '}</strong> 
                Check the information below below.
            <ul className="list-group mt-2">
                {msg}
            </ul>
            <button type="button" className="close" onClick={props.closeAlert} data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
}

const errorTemplate = e => {
    e = JSON.parse(JSON.stringify(e));
    let serverError = null;
    if (e.response) {
        let ex = e.response.data;
        serverError = (
            <div>
                {
                    e.response.status === 500
                        ?
                        <li className="list-group-item" >
                            <strong>{ex.error.code}</strong> {`: ${ex.error.sqlMessage}`}
                        </li>
                        :
                        e.response.status === 404
                            ?
                            <li className="list-group-item" >
                                <strong>Error</strong> {`: ${ex.error}`}
                            </li>
                            :
                            e.response.status === 401
                                ?
                                <li className="list-group-item" >
                                    <strong>Error</strong> {`: ${ex.message}`}
                                </li>
                                :
                                ex.errors.map((err, index) => {
                                    return (
                                        <li className="list-group-item" key={index} >
                                            <strong>{err.param}</strong> {`: ${err.msg}`}
                                        </li>
                                    );
                                })
                }
            </div>
        );
    } else {
        serverError = (
            <div>
                {
                    <li className="list-group-item" >
                        <strong>Error</strong>
                        : Server Down!
                     </li>
                }
            </div>
        );
    }

    return serverError;
}

export default Alert;