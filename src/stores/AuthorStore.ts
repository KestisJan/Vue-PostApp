import { defineStore } from "pinia";
import { type IAuthor } from "@/interface/IAuthors";
import { useNotificationStore } from "./NotificationStore";
import  axiosService from '@/service/axiosService'
import { readonly, ref } from "vue";

export const useAuthorsStore = defineStore('authors-store', () => {
    const notificationStore = useNotificationStore()
    const authors = ref<IAuthor[]>([])

    const fetchAuthors = async () => {
        try {
            const response = await axiosService.fetchData('/authors')
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


    return {
        authors: readonly(authors),
        fetchAuthors
    }
});