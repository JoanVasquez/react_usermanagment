import React from 'react';
import UserService from '../../services/UserService';
import { Header, Body } from '../Panel/Panel.jsx';
import ServerError from '../ServerError/ServerError.jsx';
import Bar from './Bar.jsx';
import Users from './Users.jsx';
import PaginatorComponent from '../Paginator/Paginator.jsx';
import Paginator from 'paginator';

class Main extends React.Component {
    state = {
        users: null,
        tmpUsers: null,
        paginatorData: null,
        pages: null,
        filter: '',
        pageSize: 5,
        serverError: null
    }
    userService = new UserService();

    setPagination = (currentPage) => {
        let paginator = new Paginator(this.state.pageSize, 7);
        let paginatorData = paginator.build(this.state.users.length, currentPage);
        let pages = [...Array((paginatorData.last_page + 1) - paginatorData.first_page).keys()].map(index => paginatorData.first_page + index);
        let tmpUsers = this.state.users.slice(paginatorData.first_result, paginatorData.last_result + 1);
        this.setState({ tmpUsers, paginatorData, pages });
    }

    setFilter = filter => {
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
            <div className="container">

                {
                    this.state.serverError ?
                        <ServerError
                            serverError={this.state.serverError}
                            closeServerErrors={this.closeServerErrors.bind(this)} /> :
                        null
                }

                <div className="card bg-light"  >
                    {
                        this.state.tmpUsers && this.state.paginatorData && this.state.pages ?
                            <div>
                                <Header>
                                    <Bar filter={this.filter} setFilter={this.setFilter} />
                                </Header>
                                <Body>
                                    <div className="row">
                                        {
                                            this.state.tmpUsers.map((user, index) => {
                                                return (
                                                    <Users key={index} user={user} />
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="row mt-2">
                                        <div className="mx-auto">
                                            <PaginatorComponent setPagination={this.setPagination} paginatorData={this.state.paginatorData} pages={this.state.pages} />
                                        </div>
                                    </div>
                                </Body>
                            </div>
                            :
                            <span>Not Data Found</span>
                    }
                </div >
            </div>
        );
    }

}

export default Main;