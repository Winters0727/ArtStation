import axios from 'axios'

const baseAPI = axios.create(
    {
        baseURL : process.env.VUE_APP_BACKEND_URL,
        withCredentials : true,
    }
)

const loginRequest = function(data) {
  return baseAPI.post('/login', data);
}

const logoutRequest = function() {
  return baseAPI.get('/logout');
}

const registerRequest = function(data) {
  return baseAPI.post('/api/users', data);
}

const createRequest = function(resource, data) {
  const token = this.$cookies.get('token');
    return baseAPI.post(`/api/${resource}`, data, {
      headers : {
        'authorization' : token
      },
    });
  }

const updateRequest = function(resource, data) {
  const token = this.$cookies.get('token');
    return baseAPI.put(`/api/${resource}`, data, {
      headers : {
        'authorization' : token
      },
    });
  }

const deleteRequest = function(resource, data) {
  const token = this.$cookies.get('token');
    return baseAPI.delete(`/api/${resource}`, data, {
      headers : {
        'authorization' : token
      },
    });
  }

const getRequest = function(resource, options) {
  const token = this.$cookies.get('token');
    return baseAPI.get(`/api/${resource}/option`, {
        params : options,
        headers : {
          'authorization' : token
        },
    });
  }

  const getAllRequest = function(resource) {
    const token = this.$cookies.get('token');
    return baseAPI.get(`/api/${resource}`, {
      headers : {
        'authorization' : token
      },
    });
  }

  const getRequestWithoutToken = function(resource, options) {
    return baseAPI.get(`/api/${resource}/option`, {
        params : options,
    });
  }

const getAllRequestWithoutToken = function(resource) {
    return baseAPI.get(`/api/${resource}`);
  }

export { registerRequest, loginRequest, logoutRequest, createRequest, updateRequest, deleteRequest, getRequest, getAllRequest, getRequestWithoutToken, getAllRequestWithoutToken }