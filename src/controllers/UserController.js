import UserService from '../services/UserService';
import React from 'react';

class UserController {

    userService = new UserService();

    async login(email, password) {
        try {
            await this.userService.login(email, password);
        } catch (e) {
            let serverError = this.errorTemplate(e);
            throw serverError;
        }
    }

    async saveOrUpdate(entity) {
        try {
            if (!entity.id) {
                await this.userService.saveUser(entity);
            } else {
                await this.userService.updateUser(entity);
            }
        } catch (e) {
            let serverError = this.errorTemplate(e);
            throw serverError;
        }
    }

    errorTemplate(e) {
        let ex = e.response.data;
        let serverError = (
            <div>
                {
                    e.response.status === 500
                        ?
                        <li className="list-group-item" >
                            <strong>{ex.error.code}</strong>
                            {`: ${ex.error.sqlMessage}`}
                        </li>
                        :
                         e.response.status === 404
                         ?
                         <li className="list-group-item" >
                            <strong>Error</strong>
                            {`: ${ex.error}`}
                        </li>
                        :
                        ex.errors.map((err, index) => {
                            return <li className="list-group-item" key={index} >
                                <strong>{err.param}</strong>
                                {`: ${err.msg}`}
                            </li>
                        })
                }
            </div>
        );
        return serverError;
    }

}

export default UserController;