<script setup lang="ts">
import { usePostsStore } from '@/stores/PostStore'
import { type IPost } from '@/interface/IPost';
import { ref } from 'vue'
import PostCard from '@/components/posts/PostsCard.vue'
import Pagination from '@/components/common/Pagination.vue';
import Search from '@/components/common/Search.vue';

const postsStore = usePostsStore()
const posts = ref<IPost[]>([]);
const isLoading = ref(true)
const currentPage = ref(1)
const itemsPerPage = ref(5)
const itemCount = ref(0);
const query = ref('')

const loadData = async (page: number, limit: number) => {
    isLoading.value = true
    posts.value = []

    try {
        const response = await postsStore.fetchPosts(
            currentPage.value,
            itemsPerPage.value,
            query.value
        );

        if (response) {
            posts.value = response.data as IPost[];
            itemCount.value = response.totalCount
        }

    } catch (err: any) {
        console.error('Error loading data:', err);
    } finally {
        isLoading.value = false;
    }
}

const handlePagination = ({ page, limit}: { page:number; limit: number}) => {
    currentPage.value = page.value
    itemsPerPage.value = limit

    setTimeout(async () => {
        await loadData()
    }, 50)
}

const handleSearch = (searchParams: { [key: string]: string }) => {
    query.value = searchParams;
    currentPage.value = 1
    loadData(currentPage.value, itemsPerPage.value, query.value)
}




loadData()

</script>

<template>
    <Search @search="handleSearch" />
    <PostCard :posts="posts"/>
    <Pagination 
        :total-items="itemCount"
        @update="handlePagination"
    />
</template>


<style scoped>

</style>