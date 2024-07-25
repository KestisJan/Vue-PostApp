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
            const response = await axiosService.postData('/aythors', author);
            notificationStore.success('Author added successfully!')
        } catch (err: any) {
            console.error('Failed to add author:', err)
        }
    }


    return {
        authors: readonly(authors),
        fetchAuthors,
        addAuthor
    }
});