import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';

const handleError = (err: any) => {
    console.error('Request Failed: ', err);
    throw err;
}

// GET
export default {
    async fetchData (endpoint: string, params?: { [key: string ]: any}) {
        try {
            const response = await axios.get(endpoint, { params });
    
            let totalCount = response.data.length
            if (response.headers['x-total-count']) {
                totalCount = parseInt(response.headers['x-total-count'])
            }
            const data = response.data
    
            return {
                data,
                totalCount
            }
    
        } catch (err: any) {
            handleError(err);
            throw err;
        }
    }

} 
    