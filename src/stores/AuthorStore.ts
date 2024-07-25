import { defineStore } from "pinia";
import { type IAuthor } from "@/interface/IAuthors";
import { useNotificationStore } from "./NotificationStore";
import { useCurrentUserStore } from "./CurrentUserStore";
import  axiosService from '@/service/axiosService'
import { readonly, ref } from "vue";

export const useAuthorsStore = defineStore('authors-store', () => {
    const notificationStore = useNotificationStore()
    const authors = ref<IAuthor[]>([])

    const fetchAuthors = async (page: number, limit: number, query?: string) => {
        try {
            const params: { [key: string]: any } = {
                _page: page,
                _limit: limit
            }

            if (query) {
                params.q = query;
            }
            
            const response = await axiosService.fetchData('/authors', params)
            if (response) {
                authors.value = response.data
            }
            notificationStore.success('Success fetching data!')
            return response
        } catch (err: any) {
            notificationStore.warning('Error fetching data:' + err)
            console.error(err)
        }
    }

    const addAuthor = async (name: string, surname: string) => {
        const currentUserStore = useCurrentUserStore()

        if (!name || !surname) throw Error('Failed to add author, empty name or surname.')

        const author: IAuthor = {
            name: name,
            surname: surname,
            userId: currentUserStore.currentUser.id,
            created_at: new Date()
        }

        try {
            const response = await axiosService.postData('/authors', author);
            notificationStore.success('Author added successfully!')
        } catch (err: any) {
            console.error('Failed to add author:', err)
            notificationStore.warning('Error fetching data:' + err)
        }
    }

    const updateAuthor = async (author: IAuthor) => {
        try {
            if (!author) throw Error('Failed to update author, no author provided')
            if (!author.name) throw Error('Failed to update author, author must have a name')
            if (!author.surname) throw Error('Failed to update author, author must have a name')
            if (!author.id) throw Error('Failed to update author, author must have an id')

            const response = await axiosService.updateData('/authors', author.id, author)

            notificationStore.success(`Updated author ${author.id} ${author.name} ${author.surname}`)

            const defaultPage = 1;
            const defaultLimit = 5;
            const defaultQuery = '';

            await fetchAuthors(defaultPage, defaultLimit, defaultQuery)
            return response;
        } catch (err: any) {
            console.error('Failed to add author:', err)
            notificationStore.warning('Error: ' + err.message)
        }
    }


    return {
        authors: readonly(authors),
        fetchAuthors,
        addAuthor,
        updateAuthor
    }
});