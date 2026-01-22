import axios from 'axios'

/**
 * *Este archivo se genera para configurar la url base en donde nuestro server va a estar haciendo las peticiones, por si se cambia de servidor solo se haga el cambio en en este archivo y no en todas las peticiones.
 */
const api= axios.create({
    baseURL:import.meta.env.VITE_API_URL
})
api.interceptors.request.use(config=>{
    const token=localStorage.getItem('AUTH_TOKEN');
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
})

export default api