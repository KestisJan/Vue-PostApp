<script setup lang="ts">
import {ref} from 'vue'
import { usePostsStore } from '@/stores/PostStore';
import { type IPostAuthor } from '@/interface/IPostAuthor';
import { useRoute, RouterLink } from 'vue-router';

const postStore = usePostsStore()
const postWithAuthor = ref<IPostAuthor | null>(null)
const route = useRoute()


const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('lt-LT');
};


const loadData = async () => {
    if (!route.params.id) {
        return
    }

    const fetchedPost = await postStore.getPostWithAuthor(Number(route.params.id))

    if (fetchedPost) {
        return postWithAuthor.value = fetchedPost
    }
}

loadData()

console.log(postWithAuthor)
</script>


<template>
<div class="container">
    <div v-if="postWithAuthor" class="box">
        <div class="title">{{ postWithAuthor.title }}</div>
        <RouterLink to="/posts">Back</RouterLink>
        <div class="body">
            <h2>Author: {{ postWithAuthor.author?.name }} {{ postWithAuthor.author?.surname }}</h2>
            <span v-if="postWithAuthor.updated_at > postWithAuthor.created_at">
                Updated at: {{ formatDate(postWithAuthor.updated_at) }}
            </span>
            <span v-else>
                Created at {{ formatDate(postWithAuthor.created_at) }}
            </span>
        </div>
    </div>
    <div v-else>Coudn't find post</div>
    <div class="header">
    </div>
</div>
</template>

<style scoped>

</style>