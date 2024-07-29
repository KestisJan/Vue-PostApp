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
        <div class="header">
          <RouterLink to="/posts" class="back-link">Back</RouterLink>
        </div>
        <div class="content">
          <div class="title">{{ postWithAuthor.title }}</div>
          <div class="body">
            <h2>Author: {{ postWithAuthor.author?.name }} {{ postWithAuthor.author?.surname }}</h2>
            <span v-if="postWithAuthor.updated_at > postWithAuthor.created_at">
              Updated at: {{ formatDate(postWithAuthor.updated_at) }}
            </span>
            <span v-else>
              Created at {{ formatDate(postWithAuthor.created_at) }}
            </span>
          </div>
          <div class="post-body">
            {{ postWithAuthor.body }}
          </div>
        </div>
      </div>
      <div v-else class="error-message">Couldn't find post</div>
    </div>
  </template>
  
  <style scoped>
  .container {
    padding: 2rem;
  }
  
  .box {
    background-color: #FAF6F6;
    border: 1px solid #1C2541;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem; 
  }
  
  .header {
    display: flex;
    justify-content: flex-end;
  }
  
  .back-link {
    color: #1C2541;
    text-decoration: none;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    background-color: #FAF6F6;
    border: 2px solid #1C2541;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  }
  
  .back-link:hover {
    color: #FAF6F6;
    background-color: #1C2541;
    border-color: #0B132B;
  }
  
  .content {
    flex: 1;
  }
  
  .title {
    color: #0B132B;
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
  
  .body {
    color: #0B132B;
    font-size: 1rem;
    margin-bottom: 1rem; 
  }
  
  .post-body {
    color: #0B132B;
    font-size: 1rem;
    white-space: pre-wrap; 
  }
  
  .error-message {
    color: #1C2541;
    font-size: 1.2rem;
    text-align: center;
    margin-top: 2rem;
  }
  </style>