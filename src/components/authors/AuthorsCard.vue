<script setup lang="ts">
import { type IAuthor } from '@/interface/IAuthors';
import { defineProps } from 'vue';


const props = defineProps<{
    authors: IAuthor[]
}>();

const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('lt-LT');
}

</script>

<template>
  <div class="container">
      <div v-if="!authors.length" class="notification is-info">
          No Authors available
      </div>
      
      <div v-else class="columns is-multiline">
          <div 
              v-for="author in authors" 
              :key="author.id" 
              class="column is-one-third-desktop is-half-tablet is-full-mobile"
          >
              <div class="card author-card">
                  <div class="card-content">
                      <h2 class="title">{{ author.name }} {{ author.surname }}</h2>
                      <p class="timestamp">
                          <span v-if="author.updated_at && author.created_at && author.updated_at > author.created_at">
                              Updated: <strong>{{ formatDate(author.updated_at) }}</strong>
                          </span>
                          <span v-else-if="author.created_at">
                              Created: <strong>{{ formatDate(author.created_at) }}</strong>
                          </span>
                      </p>
                  </div>
                  <footer class="card-footer">
                    <slot name="edit-author" :author="author">
                      <button class="button is-warning" @click="defaultAction(post.id)">
                        <span class="icon is-small">
                          <i class="fas fa-edit"></i>
                        </span>
                        <span>Edit</span>
                      </button>
                    </slot>
                    <slot name="delete-author" :author="author">
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

.notification {
  margin-bottom: 2rem;
}

.author-card {
  background-color: #ecf0f1;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-content {
  padding: 1.5rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.timestamp {
  font-size: 0.875rem;
  color: black;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-top: 1px solid #34495e;
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