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

    const getPost = async (id: number): Promise<IPost | null> => {
        try {
            return await axiosService.getData('/posts', id)
        } catch (err: any) {
            console.error('Error fetching posts: ', err)
            notificationStore.warning('Error fetching posts: ' +  err.message || err )
            return null
        }
    }

    const updatePost = async (post: IPost) => {
        try {
            if (!post.id) throw Error('Failed to update post, no post id')
            if (!post.title) throw Error('Failed to update post, post must have a title')
            if (!post.body) throw Error('Failed to update post, post must have a body')

            post.updated_at = new Date()
            await axiosService.updateData('/posts', post.id, post)
            notificationStore.success(`Updated post ${post.id} ${post.title}.s`)
            await fetchPosts()
        } catch (err: any) {
            console.error('Error updating post: ', err)
            notificationStore.warning('Error updating post: ' + err.message || err)
        }
    }

    const deletePost = async (id: number) => {
        const currentUserStore = useCurrentUserStore()

        if (!currentUserStore.currentUser) {
            throw Error("Can't delete author, because you're currently not logged in.")
        }

        try {
            if (!id) throw Error('Failed to delete post, post must have an id')

            const response = await axiosService.deleteData('/posts', id)

            notificationStore.success(`Deleted post ${id}`)

            return response;
        } catch (err: any) {
            console.error('Failed to delete author:', err);
            notificationStore.warning('Error: ' + err.message)
        }
    }

    return {
        posts: readonly(posts),
        fetchPosts,
        getPostWithAuthor,
        addPost,
        getPost,
        updatePost,
        deletePost
    }
})