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
    return baseAPI.post(`/api/${resource}`, data);
  }

const updateRequest = function(resource, data) {
    return baseAPI.put(`/api/${resource}`, data);
  }

const deleteRequest = function(resource, data) {
    return baseAPI.delete(`/api/${resource}`, data);
  }

const getRequest = function(resource, options) {
    return baseAPI.get(`/api/${resource}/option`, {
        params : options,
    });
  }

  const getAllRequest = function(resource) {
    return baseAPI.get(`/api/${resource}`);
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