import axios from 'axios';

class UserService {

    url = 'http://localhost:8080/api/user/';

    async login(email, password) {
        try {
            let result = await axios.post(`${this.url + 'login'}`, 
            { email, password }, {'Content-Type': 'application/json'} );
            if (result.data.success) {
                sessionStorage.setItem('user', result.data.result);
                sessionStorage.setItem('jwt', result.data.token);
            }
        } catch (ex) {
            throw JSON.parse(JSON.stringify(ex));
        }
    }

    async saveUser(entity) {
        try {
            let result = await axios.put(`${this.url + 'register'}`,
            entity, {'Content-Type': 'application/json'} );
            if(result.data.success) {
                await this.login(entity.email, entity.password);
                return true;
            }
            return false;
        } catch (ex) {
            throw JSON.parse(JSON.stringify(ex));
        }
    }
}

export default UserService;