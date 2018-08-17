import React from 'react';
import Modal from '../Modal/Modal.jsx';
import SignUpForm from '../SignUp/SignUpForm.jsx';
import Alert from '../Alert/Alert.jsx';
import PaginatorComponent from '../Paginator/Paginator.jsx';
import { Header, Body } from '../Panel/Panel.jsx';
import Bar from './Bar.jsx';
import Paginator from 'paginator';
import UserService from '../../services/UserService';
import logo from '../../assets/images/user.png';
import '../../assets/css/Users.css';

class Users extends React.Component {

    state = {
        user: null,
        users: null,
        tmpUsers: null,
        paginatorData: null,
        pages: null,
        filter: '',
        pageSize: 5,
        serverError: null,
        serverSuccess: null
    }

    userService = new UserService();

    showModal = user => {
        user.password = '';
        user.passwordConfirmation = '';
        this.setState({ user });
    }

    onSave = async event => {
        await this.child.onSubmit(event);
        this.setPagination(this.state.paginatorData.current_page);
    }

    onDelete = async () => {
        try {
            let currentUser = sessionStorage.getItem('user');
            currentUser = JSON.parse(currentUser);
            await this.userService.deleteUser(this.state.user);
            let users = this.state.users.filter(user => user.id !== this.state.user.id);
            this.setState({ users, serverSuccess: 'User Deleted!' });
            this.setPagination(this.state.paginatorData.current_page);
            if (this.state.user.id === currentUser.id) {
                this.onLogout();
            }
        } catch (ex) {
            this.setState({ serverError: ex });
        } finally {

        }


    }

    closeAlert = () => {
        this.setState({ serverError: null, serverSuccess: null });
    }

    setPagination = (currentPage) => {
        console.log(currentPage)
        let paginator = new Paginator(this.state.pageSize, 7);
        let paginatorData = paginator.build(this.state.users.length, currentPage);
        let pages = [...Array((paginatorData.last_page + 1) - paginatorData.first_page).keys()].map(index => paginatorData.first_page + index);
        let tmpUsers = this.state.users.slice(paginatorData.first_result, paginatorData.last_result + 1);
        this.setState({ tmpUsers, paginatorData, pages });

    }

    setFilter = filter => {
        this.setState({ filter })
        if (filter.length) {
            let filterUsers = this.state.users.
                filter(user => user.email.toString().toLowerCase().
                    indexOf(filter.toLowerCase()) >= 0);
            let paginator = new Paginator(this.state.pageSize, 7);
            let paginatorData = paginator.build(filterUsers.length, 1);
            let pages = [...Array((paginatorData.last_page + 1) - paginatorData.first_page).keys()].map(index => paginatorData.first_page + index);
            filterUsers = filterUsers.slice(paginatorData.first_result, paginatorData.last_result + 1);
            this.setState({ tmpUsers: filterUsers, paginatorData, pages });
        } else {
            this.setPagination(1);
        }
    }

    async componentDidMount() {
        try {
            let users = await this.userService.readUser();
            this.setState({ users: users.data.result, pageSize: 4 });
            this.setPagination(1);
        } catch (ex) {
            this.setState({ serverError: ex });
        }
    }

    render() {

        return (
            <div>
                <Header>
                    <Bar filter={this.state.filter} setFilter={this.setFilter} onLogout={this.props.onLogout} />
                </Header>
                <Modal cssClass="btn-primary" id="editModal" message="Update User" title="Update User" action={this.onSave}>
                    {this.state.user && <SignUpForm user={this.state.user} onRef={ref => (this.child = ref)} />}
                </Modal>
                <Modal cssClass="btn-primary" id="deleteModal" message="Delete User" title="Delete User" action={this.onDelete}>
                    Are you sure about deleting this user?
                </Modal>

                {this.state.serverError ?
                    <Alert
                        alertClass="alert-danger"
                        error="true"
                        serverError={this.state.serverError}
                        closeAlert={this.closeAlert.bind(this)} /> : null}

                {this.state.serverSuccess ?
                    <Alert
                        alertClass="alert-success"
                        message={this.state.serverSuccess}
                        closeAlert={this.closeAlert.bind(this)} /> : null}

                {this.state.tmpUsers && this.state.paginatorData && this.state.pages ?
                    <Body>
                        <div className="row">
                            {this.state.tmpUsers.map((user, index) => {
                                return (
                                    <div key={index} className="col-md-3 col-sm-12">
                                        <div className="card mx-auto mt-2">
                                            <img className="card-img-top img-responsive mx-auto"
                                                src={logo} alt="Card image cap"
                                                style={{ width: '50%' }} />

                                            <div className="card-body">
                                                <h5 className="card-title">{user.name}</h5>
                                                <div className="text-left">
                                                    <p> <i className="fas fa-id-card" aria-hidden="true"></i> <strong>ID:</strong> {user.id} </p>
                                                    <p> <i className="fas fa-at" aria-hidden="true"></i> <strong>Email:</strong> {user.email} </p>
                                                    <p> <i className="fa fa-lock" aria-hidden="true"></i> <strong>Password:</strong> ********** </p>
                                                </div>
                                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                <span className="input-group-btn">
                                                    <button type="button" className="btn btn-block btn-success"
                                                        data-toggle="modal"
                                                        data-target="#editModal"
                                                        onClick={() => this.showModal(user)}>
                                                        <span><i className="fas fa-edit"></i> Edit</span>
                                                    </button>
                                                    <button type="button"
                                                        className="btn btn-block btn-danger"
                                                        data-toggle="modal"
                                                        data-target="#deleteModal"
                                                        onClick={() => this.showModal(user)}>
                                                        <span><li className="fas fa-trash-alt"></li> Delete</span>
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="row mx-5 table-responsive">
                                <PaginatorComponent setPagination={this.setPagination} paginatorData={this.state.paginatorData} pages={this.state.pages} />
                            </div>
                        </div>
                    </Body>
                    : null}

            </div>
        );
    }
}
export default Users;
