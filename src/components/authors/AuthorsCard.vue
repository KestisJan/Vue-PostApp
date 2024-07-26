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
   <div class="card">
        <div class="card-content is-flex is-flex-direction-column is-align-items-center">
            <div v-if="!authors.length" class="">
                No Authors available
            </div>
            <div v-else>
                <div v-for="author in authors" class="box" style="width: 100%; height: 100%; max-width: 500px;">
                    <div class="card-header">
                        <p class="title is-5">{{ author.name }} {{ author.surname }}</p>
                    </div>
                    <div class="card-body p-4">
                        <p class="subtitle is-6">
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
                            <button class="button"  @click="defaultAction(author)">
                                Default Action
                            </button>
                        </slot>
                        <slot name="delete-author" :author="author">
                            <button class="button"  @click="defaultAction(author)">
                                Delete Default Action
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>

<style scoped>

</style>