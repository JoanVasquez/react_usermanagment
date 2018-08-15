import React from 'react';
import logo from '../../assets/images/user.png';
import '../../assets/css/Users.css';

const Users = props => {
    return (
            <div className="col-md-3 col-sm-12">
                <div className="card mx-auto mt-2">
                    <img className="card-img-top img-responsive mx-auto"
                        src={logo} alt="Card image cap"
                        style={{ width: '50%' }} />

                    <div className="card-body">
                        <h5 className="card-title">{props.user.name}</h5>
                        <div className="text-left">
                            <p> <i className="glyphicon glyphicon-user" aria-hidden="true"></i> {props.user.email} </p>
                            <p> <i className="glyphicon glyphicon-lock" aria-hidden="true"></i> ********** </p>
                        </div>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <span className="input-group-btn">
                            <button type="button" className="btn btn-block btn-success"
                                data-toggle="modal"
                                data-target="#editModal"
                                onClick={() => props.showModal(props.user)}>
                                Edit
                            </button>
                            <button type="button" 
                                    className="btn btn-block btn-danger" 
                                    data-toggle="modal" 
                                    data-target="#editModal">
                                Delete
                            </button>
                        </span>
                    </div>
                </div>
            </div>
    );
}
export default Users;
