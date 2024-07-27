import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5005',
      withCredentials: true
    });
    this.service = service;
  }

  signup = (username, password, campus, course) => {
    return this.service.post('/auth/signup', { username, password, campus, course })
      .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/auth/login', { username, password })
      .then(response => response.data)
  }

  verify = () => {
    return this.service.get('/auth/verify')
      .then(response => response.data)
  }

  user = (id) => {
    return this.service.get(`/api/users?id=${id}`)
      .then(response => response.data)
  }

  userUpdate = (id, image) => {
    return this.service.put(`/api/users?id=${id}`, { image })
      .then(response => response.data)
  }

  uploadImage = (image) => {
    return this.service.post('/auth/upload', image)
      .then(response => response.data)
  }
}

export default AuthService;