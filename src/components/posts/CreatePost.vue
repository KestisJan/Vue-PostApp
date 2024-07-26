<script setup lang="ts">
import { ref } from 'vue'
import { usePostsStore } from '@/stores/PostStore';

const emit = defineEmits(['close'])
const props = defineProps<{ callbackfn: () => void}>()

const postStore = usePostsStore()
const title = ref('')
const body = ref('')
const validationMessage = ref<string[]>([]) 

const createNewAuthor = () => {
    validate()

    if (validationMessage.value.length === 0) {
        postStore.addPost(title.value, body.value)
        props.callbackfn
        emit('close')
    }
}



const validate = () => {
    validationMessage.value = [];

    if (validationMessage.value.length > 0) {
        setTimeout(() => {
            validationMessage.value = [];
        }, 2500);
        return
    }
}
</script>


<template>
    <div>
        <h3>Create Post</h3>
        <form v-on:submit.prevent="createNewAuthor">
            <input
                type="text"
                v-model="title"
                placeholder="Title"
                class="input-field"
                maxlength="50"
            />
            <input 
                type="text"
                v-model="body"
                placeholder="Body"
                class="input-field"
                maxlength="50"
            />
            <button type="submit" class="submit-button">Create</button>
            <ul v-if="validationMessage.length">
                <li v-for="(message, index) in validationMessage" :key="index">{{ message }}</li>
            </ul>
        </form>
    </div>
</template>