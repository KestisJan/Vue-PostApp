<script setup lang="ts">
import { usePostsStore } from '@/stores/PostStore'
import { type IPost } from '@/interface/IPost';
import { ref } from 'vue'
import PostCard from '@/components/posts/PostsCard.vue'


const postsStore = usePostsStore()
const posts = ref<IPost[]>([]);
const isLoading = ref(true)

const loadData = async () => {
    isLoading.value = true
    posts.value = []

    const response = await postsStore.fetchPosts()
    if(response) {
        posts.value = response.data as IPost[]
    }
    console.log(response);

    isLoading.value = false
}

loadData()

</script>

<template>
    <PostCard :posts="posts"/>
</template>


<style scoped>

</style>