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
 <div class="card">
        <div class="card-content is-flex is-flex-direction-column is-align-items-center">
            <div v-if="!posts.length" class="">
                No Authors available
            </div>
            <div v-else>
                <div v-for="post in posts" class="box" style="width: 100%; height: 100%; max-width: 500px;">
                    <div class="card-header">
                        <p class="title is-5">{{ post.title }}</p>
                        <button class="button" @click="postDetails(post.id)">Details</button>
                        <span v-if="post.updated_at && post.created_at && post.updated_at > post.created_at">
                            Updated: {{ formatDate(post.updated_at) }}
                        </span>
                        <span v-else-if="post.created_at">
                            Created: {{ formatDate(post.created_at) }}
                        </span>
                    </div>
                    <div class="card-body p-4">
                        <p class="subtitle is-6">
                            <span>
                                {{ post.body }}
                            </span>
                        </p>
                    </div>
                    <div class="card-footer">
                        <slot name="edit-post" :post="post">
                            <button class="button"  @click="defaultAction(post.id)">
                                Default Edit
                            </button>
                        </slot>
                        <slot name="delete-post" :post="post">
                            <button class="button" @click="defaultAction(post.id)">
                                Default Delete
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