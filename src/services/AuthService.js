
import axios from 'axios';

const API_URL = 'http://34.228.31.75:8000/api/auth/';

class AuthService {
    login(user) {
      return axios
        .post(`${API_URL}login/`, {
          username: user.username,
          password: user.password
        })
        .then(response => {
          if (response.data.key) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
          return response.data;
        });
    }
  
    logout() {
      localStorage.removeItem('user');
    }
  
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));
    }
  
    isAuthenticated() {
      return !!localStorage.getItem('user');
    }
  }
  
  export default new AuthService();