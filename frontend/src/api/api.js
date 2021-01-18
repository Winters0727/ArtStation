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

const createRequest = function(resource, data, refreshToken) {
    return baseAPI.post(`/api/${resource}`, data, {
      headers : {
        'authorization' : refreshToken
      },
    });
  }

const updateRequest = function(resource, data, refreshToken) {
    return baseAPI.put(`/api/${resource}`, data, {
      headers : {
        'authorization' : refreshToken
      },
    });
  }

const deleteRequest = function(resource, data, refreshToken) {
    return baseAPI.delete(`/api/${resource}`, data, {
      headers : {
        'authorization' : refreshToken
      },
    });
  }

const getRequest = function(resource, options, refreshToken) {
    return baseAPI.get(`/api/${resource}/option`, {
        params : options,
        headers : {
          'authorization' : refreshToken
        },
    });
  }

  const getAllRequest = function(resource, refreshToken) {
    return baseAPI.get(`/api/${resource}`, {
      headers : {
        'authorization' : refreshToken
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