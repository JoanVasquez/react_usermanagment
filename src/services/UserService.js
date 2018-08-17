import axios from 'axios';

class UserService {

    url = 'http://localhost:8080/api/user/';

    async login(email, password) {
        let header = { 'Content-Type': 'application/json' };
        try {
            return await axios.post(`${this.url + 'login'}`,
                { email, password }, { headers: header });
        } catch (ex) {
            throw ex; 
        }
    }

    async saveUser(entity) {
        let header = { 'Content-Type': 'application/json' };
        try {
            let result = await axios.put(`${this.url + 'register'}`,
                entity, {headers: header});
            if (result.data.success) {
                return await this.login(entity.email, entity.password);
            }
            return false;
        } catch (ex) {
            throw ex; 
        }
    }

    async updateUser(entity) {
        let jwt = sessionStorage.getItem('jwt');
        let header = { 
            'Content-Type': 'application/json',
            'x-access-token': jwt 
        };
        console.log(entity);
        console.log(jwt)
        try {
            await axios.post(`${this.url + 'update'}`, entity, {headers: header});
        } catch (ex) {
            throw ex; 
        }
    }

    async deleteUser(entity) {
        let jwt = sessionStorage.getItem('jwt');
        let header = { 
            'Content-Type': 'application/json',
            'x-access-token': jwt 
        };
        try {
            await axios.delete(`${this.url + 'delete'}`, {data: entity, headers: header});
        } catch (ex) {
            throw ex; 
        }
    }

    async readUser() {
        let jwt = sessionStorage.getItem('jwt');
        let header = { 
            'Content-Type': 'application/json',
            'x-access-token': jwt 
        };
        try {
            return await axios.get(`${this.url + 'read'}`, {headers: header});
        } catch (ex) {
            throw ex; 
        }
    }

}

export default UserService;