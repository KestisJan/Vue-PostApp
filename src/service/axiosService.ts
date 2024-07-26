import { useCurrentUserStore } from '@/stores/CurrentUserStore';
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

            // Pagination
            if (params?.paginationPage !== undefined && params?.paginationLimit !== undefined) {
                params._page = params.paginationPage;
                params._limit = params.paginationLimit;
                delete params.paginationPage;
                delete params.paginationLimit;
            }

            // Search query
            if (params?.query !== undefined) {
                params.q = params.query;
                delete params.query;
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

    async getData(endpoint: string, id: number) {
        try {
            const response = await axios.get(`${endpoint}/${id}`)
            return response.data
        } catch (err: any) {
            console.error('Error getting author:', err)
            throw err
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
    },

    async postData(endpoint: string, data: any) {
        try {
            const response = await axios.post(endpoint, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data
        } catch (err: any) {
            return handleError(err)
        }
    },


    async updateData(endpoint: string, id: number, data: any) {
        try {
            const response = await axios.patch(`${endpoint}/${id}`, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data
        } catch (err: any) {
            return handleError(err)
        }
    },


    async deleteData(endpoint: string, id: number) {
        try {
            const response = await axios.delete(`${endpoint}/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response
        } catch (err: any) {
            return handleError(err)
        }
    }



} 
    