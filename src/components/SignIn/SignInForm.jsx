import React from 'react';
import Button from '../Button/Button.jsx';
import Inputs from './Inputs.jsx';
import FormValidator from '../FormValidator/FormValidator';
import Validation from './Validation';
import UserController from '../../controllers/UserController';
import { Link, Redirect } from 'react-router-dom';

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new FormValidator(Validation());
        this.state = {
            fields: {
                email: '',
                password: '',
                jwt: null
            },
            validation: this.validator.valid(),
            serverError: null
        }

        this.userController = new UserController();
        this.submitted = false;
        this.onSubmit = this.onSubmit.bind(this);
        this.closeServerErrors = this.closeServerErrors.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentWillMount() {
        if (sessionStorage.getItem('jwt')) {
            this.setState({ jwt: sessionStorage.getItem('jwt') });
        }
    }

    onSubmit = event => {
        event.preventDefault();
        const validation = this.validator.validate(this.state.fields);
        this.setState({ validation });
        this.submitted = true;
        let { email, password } = this.state.fields;

        if (validation.isValid) {
            this.userController.login(email, password).
            then(() => {
                this.setState({ jwt: sessionStorage.getItem('jwt') });
            }).
            catch(serverError => {
                if (Object.keys(serverError).length !== 0) this.setState({ serverError });
            });
        }
    }

    onInputChange(event) {
        let fields = this.state.fields;
        fields[event.target.id] = event.target.value;
        this.setState({ fields });
    }

    closeServerErrors() {
        this.setState({ serverError: null });
    }


    render() {
        if (this.state.jwt) {
            return <Redirect to='/Main' />
        }

        let validation = this.submitted ?
            this.validator.validate(this.state.fields) :
            this.state.validation;

        return (

            <div>
                {
                    this.state.serverError
                        ?
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Holy guacamole an error occurred!</strong> Check the information below below.
                            <ul className="list-group mt-2">
                                {this.state.serverError}
                            </ul>
                            <button type="button" className="close" onClick={this.closeServerErrors} data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        :
                        null
                }

                <form className="form-horizontal " onSubmit={this.onSubmit}>
                    <Inputs validation={validation} onInputChange={this.onInputChange} state={this.state.fields} />
                    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group mr-2" role="group" aria-label="Second group">
                            <Button type="submit" btnClass="btn btn-success" msg="Sign In" />
                        </div>
                        <div className="btn-group" role="group" aria-label="Third group">
                            <Link to='/SignUp'>Not a member? SignUp</Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignInForm;