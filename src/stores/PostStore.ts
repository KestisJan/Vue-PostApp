import { defineStore } from 'pinia'
import { type IPost } from '@/interface/IPost'
import { type IPostAuthor } from '@/interface/IPostAuthor'
import { readonly, ref } from 'vue'
import { useNotificationStore } from './NotificationStore'
import  axiosService from '@/service/axiosService'
import { useCurrentUserStore } from './CurrentUserStore'


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

    const addPost = async (posts: IPost) => {
        const currentUserStore = useCurrentUserStore()

        if (!currentUserStore.currentUser) {
            throw Error ("Can't add post, because you're currently not logged in.")
        }

        const postToAdd: IPost = {
            title: posts.title,
            body: posts.body,
            authorId: posts.authorId,
            userId: currentUserStore.currentUser.id,
            created_at: new Date()
        }

        try {
            const response = await axiosService.postData('/posts', JSON.stringify(postToAdd))
            notificationStore.success('Added Post successfully!')
            return response
        } catch (err: any) {
            console.error('Failed to add post:', err)
            notificationStore.warning('Error adding post:' + err.message || err)
        }
    }


    return {
        posts: readonly(posts),
        fetchPosts,
        getPostWithAuthor,
        addPost
    }
})