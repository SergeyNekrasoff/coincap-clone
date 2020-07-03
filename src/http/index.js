import axios from 'axios'
import store from '@/store'

let axiosConfig = {
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 4000,
    crossdomain: false,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    }
}

const httpClient = axios.create(axiosConfig)

httpClient.interceptors.request.use((config) => {
    store.dispatch('handleRequest', { 
        loading: true, 
        error: '' 
    })
    
    return config
}, (error) => {
    Promise.reject(error)
})

httpClient.interceptors.response.use((response) => {
    if (response.status === 200 || response.status === 201 || response.status === 204) {
        store.dispatch('handleRequest', { 
            loading: false, 
            error: '' 
        })
    }

    return response
}, (error) => {
    // const code = err.response.data.errors[0].code
    const text = error.response.data.errors[0].message

    store.dispatch('handleRequest', { 
      loading: false, 
      error: text 
    })
})


export { httpClient }