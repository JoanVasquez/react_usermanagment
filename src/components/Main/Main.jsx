import React from 'react';
import { Redirect } from 'react-dom';
import UserService from '../../services/UserService';
import { Header, Body } from '../Panel/Panel.jsx';
import ServerError from '../ServerError/ServerError.jsx';
import Bar from './Bar.jsx';
import Users from './Users.jsx';

class Main extends React.Component {

    state = {
        users: {},
        serverError: null,
        isLoading: true
    }
    userService = new UserService();

    async componentDidMount() {
        try{
            let users = await this.userService.readUser();
            this.setState({ users: users.data.result, isLoading: false });
        }catch(ex) {
            this.setState({ serverError: ex });
        }
    }

    render() {
        return (
            Object.keys(this.state.users).length ?
            <div className="container-fluid">
                <div className="card bg-light">
                    <Header>
                        <Bar />
                    </Header>
                    <Body>
                        <Users users={this.state.users} />
                    </Body>
                </div >
            </div> :
            null
        );
    }

}

export default Main;