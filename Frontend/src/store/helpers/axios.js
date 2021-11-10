import axios from 'axios'

export const readMethod = (payload) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
        };
    return new Promise((resolve, reject) => {      
        axios.get(`http://localhost:3000/api/v1/${payload.module.toLowerCase()}`, config).then(response => {
        resolve(response)
        }).catch(error => {
        reject(error)
        })
    })
}

export const createMethod = (payload) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
        };
    return new Promise((resolve, reject) => {      
        axios.post(`http://localhost:3000/api/v1/${payload.module.toLowerCase()}/${payload.service && payload.service.toLowerCase()}`, payload.data ,config).then(response => {
        resolve(response)
        }).catch(error => {
        reject(error)
        })
    })
}

export const updateMethod = (payload) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
        };
    return new Promise((resolve, reject) => {      
        axios.post(`http://localhost:3000/api/v1/${payload.module.toLowerCase()}/${payload.service && payload.service.toLowerCase()}`, payload.data ,config).then(response => {
        resolve(response)
        }).catch(error => {
        reject(error)
        })
    })
}

export const deleteMethod = (payload) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    return new Promise((resolve, reject) => {      
        axios.post(`http://localhost:3000/api/v1/${payload.module.toLowerCase()}/${payload.service && payload.service.toLowerCase()}`, payload.data ,config).then(response => {
        resolve(response)
        }).catch(error => {
        reject(error)
        })
    })
}