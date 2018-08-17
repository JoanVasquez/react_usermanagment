import React from 'react';
import Button from '../Button/Button.jsx';
import Inputs from './Inputs.jsx';
import FormValidator from '../FormValidator/FormValidator';
import Alert from '../Alert/Alert.jsx';
import Validation from './Validation';
import UserService from '../../services/UserService';
import { Link, Redirect } from 'react-router-dom';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new FormValidator(Validation(this.passwordMatch));
        this.state = {
        fields: {
            id: 0,
            name: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        },
        validation: this.validator.valid(),
        serverError: null,
        serverSuccess: null,
        isRedirect: false
    }

    this.userService = new UserService();
    this.submitted = false;
    }

    passwordMatch = (confirmation, state) => (state.password === confirmation);

    onSubmit = async event => {
        event.preventDefault();
        const validation = this.validator.validate(this.state.fields);
        this.setState({ validation });
        this.submitted = true;
        if (validation.isValid) {
            try {
                if (this.state.fields.id === 0) {
                    await this.save();
                }
                else {
                    await this.update();
                }
            } catch (ex) {
                this.setState({ serverError: ex });
            }
        }
    }

    async save() {
        let result = await this.userService.saveUser(this.state.fields);
        let user = result.data.result;
        let jwt = result.data.token;
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('jwt', jwt);
        this.setState({ isRedirect: true });
    }

    async update() {
        await this.userService.updateUser(this.state.fields);
        this.setState({ serverSuccess: 'User Updated! '});
    }

    onInputChange(event) {
        let fields = this.state.fields;
        fields[event.target.id] = event.target.value;
        this.setState({ fields });
    }

    closeAlert = () => {
        this.setState({ serverError: null });
    }

    componentWillMount() {
        let user = this.props.user;
        if(user) this.setState({ fields: user });
    }

    componentDidMount() {
        if(this.props.onRef) {
            this.props.onRef(this);
        }
    }

    render() {
        let validation = this.submitted ?
            this.validator.validate(this.state.fields) :
            this.state.validation;

        return (
            <div>
                {
                    this.state.serverError ?
                        <Alert
                            alertClass="alert-danger"
                            error="true"
                            serverError={this.state.serverError}
                            closeAlert={this.closeAlert.bind(this)} /> :
                        null
                }

                {
                    this.state.serverSuccess ?
                        <Alert
                            alertClass="alert-success"
                            message={this.state.serverSuccess}
                            closeAlert={this.closeAlert.bind(this)} /> :
                        null
                }

                {
                    this.state.isRedirect ?
                        <Redirect to="/main" /> :

                        <form className="form-horizontal " onSubmit={this.onSubmit.bind(this)}>

                            <Inputs validation={validation} onInputChange={this.onInputChange.bind(this)} state={this.state.fields} />

                            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                {
                                    this.state.fields.id === 0?
                                        <div>
                                            <div className="btn-group mr-2" role="group" aria-label="Second group">
                                                <Button type="submit" btnClass="btn btn-success" msg="Send" />
                                            </div>
                                            <div className="btn-group" role="group" aria-label="Third group">
                                                <Link to='/SignIn'>Already have accoountr? SignIn</Link>
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        </form>
                }
            </div>

        );
    }
}

export default SignUpForm;