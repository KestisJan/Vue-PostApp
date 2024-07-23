import { defineStore } from 'pinia'
import { type IPost } from '@/interface/IPost'
import { type IPostAuthor } from '@/interface/IPostAuthor'
import { readonly, ref } from 'vue'
import { useNotificationStore } from './NotificationStore'
import  axiosService from '@/service/axiosService'


export const usePostsStore = defineStore('posts-store', () => {
    const notificationStore = useNotificationStore()
    const posts = ref<IPost[]>([])

    const fetchPosts = async (page: number, limit: number, query?: string) => {
        try {
            const params: { [key: string]: any } = {
                _page: page,
                _limit: limit
            }

            if (query) {
                params.q = query;
            }
           
            const response = await axiosService.fetchData('/posts', params);

            if (response) {
                posts.value = response.data
            }
            
            notificationStore.success('Success fetching data!');
            return response;
        } catch (err: any) {
            notificationStore.warning('Error fetching data:' + err.message);
            console.error(err);
            throw err;
        }
    }

    const getPostWithAuthor = async(id: number): Promise<IPostAuthor| null> => {
        try {
            const response = await axiosService.fetchDataWithAuthor('/posts', id)
            if (response) {
                notificationStore.success('Success fetching data!')
                return response
            }
        } catch (err: any) {
            notificationStore.warning('Error fetching data:' + err)
            console.error(err)
            throw(err)
        }
    }

    return {
        posts: readonly(posts),
        fetchPosts,
        getPostWithAuthor
    }
})