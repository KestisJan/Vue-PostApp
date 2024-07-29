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
    <div class="columns is-multiline">
      <div class="column is-one-third" v-for="author in authors" :key="author.id">
        <div class="card is-background-grey">
          <div class="card-content">
            <p class="title has-text-white">{{ author.name }} {{ author.surname }}</p>
            <p class="subtitle is-6 has-text-white">
              <span v-if="author.updated_at && author.created_at && author.updated_at > author.created_at">
                Updated: {{ formatDate(author.updated_at) }}
              </span>
              <span v-else-if="author.created_at">
                Created: {{ formatDate(author.created_at) }}
              </span>
            </p>
          </div>
          <div class="card-footer">
            <slot name="edit-author" :author="author">
              <button class="button is-warning" @click="updateAuthor(author.id)">Edit</button>
            </slot>
            <slot name="delete-author" :author="author">
              <button class="button is-danger" @click="confirmDeleteAuthor(author.id, author.name, author.surname)">Delete</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </template>


<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.card-box {
  width: 100%;
  max-width: 600px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.card-body {
  text-align: left;
}

.card-footer {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #eee;
  padding-top: 1rem;
  margin-top: 1rem;
}
</style>