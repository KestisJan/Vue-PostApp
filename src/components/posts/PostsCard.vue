<script setup lang="ts">
import {defineProps} from 'vue'
import { type IPost } from '@/interface/IPost';
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps<{
    posts: IPost[]
}>();

const postDetails = (id: number) => {
    if (id) router.push('/posts/' + id)
}


const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('lt-LT');
}

</script>

<template>
  <div class="container">
    <div v-if="!posts.length" class="notification is-info">
      No Posts available
    </div>

    <div v-else class="columns is-multiline">
      <div 
        v-for="post in posts" 
        :key="post.id" 
        class="column is-one-third-desktop is-half-tablet is-full-mobile"
      >
        <div class="post-card card">
          <div class="card-content">
            <h2 class="title is-4">{{ post.title }}</h2>
            <p class="timestamp">
              <span v-if="post.updated_at && post.created_at && post.updated_at > post.created_at">
                Updated: <strong>{{ formatDate(post.updated_at) }}</strong>
              </span>
              <span v-else-if="post.created_at">
                Created: <strong>{{ formatDate(post.created_at) }}</strong>
              </span>
            </p>
            <div class="card-body">
              <p class="subtitle is-6">
                {{ post.body }}
              </p>
            </div>
          </div>

          <footer class="card-footer">
            <button class="button is-info" @click="postDetails(post.id)">
              <span class="icon is-small">
                <i class="fas fa-info-circle"></i>
              </span>
              <span>Details</span>
            </button>
            <slot name="edit-post" :post="post">
              <button class="button is-warning" @click="defaultAction(post.id)">
                <span class="icon is-small">
                  <i class="fas fa-edit"></i>
                </span>
                <span>Edit</span>
              </button>
            </slot>
            <slot name="delete-post" :post="post">
              <button class="button is-danger" @click="defaultAction(post.id)">
                <span class="icon is-small">
                  <i class="fas fa-trash"></i>
                </span>
                <span>Delete</span>
              </button>
            </slot>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  padding: 2rem;
}

.post-card {
  background-color: #FFFFFF; 
  border-radius: 8px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  overflow: hidden; 
}

.card-content {
  padding: 1rem; 
}

.title {
  font-size: 1.5rem;
  color: #333333; 
  margin-bottom: 0.5rem; 
}

.timestamp {
  font-size: 0.875rem; 
  color: #666666; 
  margin-bottom: 1rem; 
}

.card-body {
  padding: 1rem; 
  background-color: #F9F9F9; 
}

.card-footer {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #F1F1F1;
  border-top: 1px solid #DDDDDD;
}

.button {
  display: flex;
  align-items: center;
}

.button.is-info {
  background-color: #209CEE; 
  color: #FFFFFF; 
}

.button.is-warning {
  background-color: #F5A623; 
  color: #FFFFFF; 
}

.button.is-danger {
  background-color: #FF3860; 
  color: #FFFFFF; 
}

.button .icon {
  margin-right: 0.5rem;
}
</style>