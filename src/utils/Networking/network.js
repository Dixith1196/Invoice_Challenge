import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.qd.fattpay.com/',
    timeout: 1000,
    headers: {
        
    }
})

export default instance;