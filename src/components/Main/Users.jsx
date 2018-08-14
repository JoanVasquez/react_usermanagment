import React from 'react';
import logo from '../../assets/images/user.png';
import '../../assets/css/Users.css';
import Modal from '../Modal/Modal.jsx';
import SignUpForm from '../SignUp/SignUpForm';
import Paginator from '../Paginator/Paginator.jsx';

class Users extends React.Component {
    state = {
        user: null,
        pageOfItems: []
    }

    onChangePage = (pageOfItems) => {
        this.setState({ pageOfItems: pageOfItems });
    }


    showModal = (user) => {
        user.passwordConfirmation = '';
        //console.log(user)
        this.setState({ user });
    }

    onSave = event => {
        this.child.onSubmit(event);
    }

    render() {
        return (
            <div>
                <Modal id="editModal" title="Update User" onSave={this.onSave}>
                    {
                        this.state.user ?
                            <SignUpForm user={this.state.user} onRef={ref => (this.child = ref)} /> :
                            null
                    }
                </Modal>


                <div className="row">
                    {
                        this.state.pageOfItems.map((user, index) => {
                            return (
                                <div className="col-md-3 col-sm-12" key={index}>
                                <div className="card mx-auto mt-2"  >
                                    <img className="card-img-top img-responsive mx-auto" src={logo} alt="Card image cap"
                                        style={{ width: '50%' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{user.name}</h5>
                                        <div className="text-left">
                                            <p>
                                                <i className="glyphicon glyphicon-user" aria-hidden="true"></i> {user.email}
                                            </p>
                                            <p>
                                                <i className="glyphicon glyphicon-lock" aria-hidden="true"></i> **********
                                                </p>
                                        </div>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <span className="input-group-btn">
                                            <button type="button" className="btn btn-block btn-success"
                                                data-toggle="modal"
                                                data-target="#editModal"
                                                onClick={() => this.showModal(user)}>
                                                Edit
                                                </button>
                                            <button type="button" className="btn btn-block btn-danger" data-toggle="modal" data-target="#editModal">
                                                Delete
                                                </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
                <div className="row mt-3">
                    <div className="mx-auto">
                    <Paginator items={this.props.users} pageSize={parseInt("4")} onChangePage={this.onChangePage} />
                    </div>
                </div>
            </div>

        )
    }
}
export default Users;