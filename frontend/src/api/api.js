import axios from 'axios'

const baseAPI = axios.create(
    {
        baseURL : process.env.VUE_APP_BACKEND_URL
    }
)

const createRequest = function(resource, data) {
    return baseAPI.post(`/api/${resource}`, data)
  }

const updateRequest = function(resource, data) {
    return baseAPI.put(`/api/${resource}`, data)
  }

const deleteRequest = function(resource, data) {
    return baseAPI.delete(`/api/${resource}`, data)
  }

const getRequest = function(resource, options) {
    return baseAPI.get(`/api/${resource}/option`, {
        params : options,
    })
  }

const getAllRequest = function(resource) {
    return baseAPI.get(`/api/${resource}`)
  }

export { createRequest, updateRequest, deleteRequest, getRequest, getAllRequest }