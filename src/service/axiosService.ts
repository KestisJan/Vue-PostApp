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

            if (params?.paginationPage !== undefined && params?.paginationLimit !== undefined) {
                params._page = params.paginationPage;
                params._limit = params.paginationLimit;
                delete params.paginationPage;
                delete params.paginationLimit;
            }

            
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
    },


    async fetchDataWithAuthor(endpoint: string,  id: number) {
        try {
            const response = await axios.get(`${endpoint}/${id}?_expand=author`)
            return response.data
        } catch (err: any) {
            handleError(err);
            throw err;
        }
    }

} 
    