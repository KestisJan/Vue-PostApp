<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePostsStore } from '@/stores/PostStore';
import { useAuthorsStore } from '@/stores/AuthorStore';

const emit = defineEmits(['close'])
const props = defineProps<{ callbackfn: () => void}>()
const authorStore = useAuthorsStore()
const postStore = usePostsStore()
const title = ref('')
const body = ref('')
const authorId = ref('')
const validationMessage = ref<string[]>([]) 

const createNewPost = () => {
    validate()

    if (validationMessage.value.length === 0) {
        postStore.addPost(title.value, body.value, authorId.value)
        props.callbackfn()
        emit('close')
    }
}

onMounted(async () => {
    await authorStore.fetchAuthors();
})



const validate = () => {
    validationMessage.value = [];

    if (!title.value.trim()) {
        validationMessage.value.push('Title is required.')
    } 

    if (!authorId.value) {
        validationMessage.value.push('Author is required.')
    }

    if (!body.value) {
        validationMessage.value.push('Body is required')
    }

    if (title.value.length > 100) {
        validationMessage.value.push('Title must not be longer than 100 characters.')
    }

    if (title.value.length > 1000) {
        validationMessage.value.push('Body must not be longer than 1000 characters.')
    }

    if (validationMessage.value.length > 0) {
        setTimeout(() => {
            validationMessage.value = [];
        }, 2500);
        return
    }
}
</script>


<template>
    <div class="form-container">
        <h3 class="form-title">Create Post</h3>
        <form v-on:submit.prevent="createNewPost">
            <input
                type="text"
                v-model="title"
                placeholder="Title"
                class="input-field"
                maxlength="50"
            />
            <select v-model="authorId" class="select-field" >
                <option disabled value="">Select Author</option>
                <option v-for="author in authorStore.authors" :key="author.id" :value="author.id" >
                    {{ author.name }} {{ author.surname }}
                </option>
            </select>
            <textarea
                v-model="body"
                placeholder="Body"
                class="textarea-field"
                maxlength="250"
            ></textarea>
            <button type="submit" class="submit-button">Create</button>
            <ul v-if="validationMessage.length" class="validation-messages">
                <li v-for="(message, index) in validationMessage" :key="index">{{ message }}</li>
            </ul>
        </form>
    </div>
</template>



<style scoped>
.form-container {
    padding: 2rem;
    border-radius: 8px;
    background-color: #FAF6F6;
    border: 1px solid #1C2541;
    max-width: 500px;
    margin: 0 auto;
}

.form-title {
    color: #0B132B;
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.input-field,
.select-field {
    border: 1px solid #1C2541;
    border-radius: 4px;
    color: #0B132B;
    padding: 0.5rem;
    width: 100%;
    margin-bottom: 1rem;
    font-size: 1rem;
}

.input-field::placeholder,
.select-field::placeholder {
    color: #1C2541;
}

.select-field {
    background-color: #FAF6F6;
    appearance: none;
    padding-right: 2rem;
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
}

.select-field:focus {
    border-color: #3273DC;
}

.textarea-field {
    border: 1px solid #1C2541;
    border-radius: 4px;
    color: #0B132B;
    padding: 0.5rem;
    width: 100%;
    height: 100px;
    margin-bottom: 1rem;
    font-size: 1rem;
    resize: vertical;
}

.submit-button {
    background-color: #1C2541;
    border: none;
    border-radius: 4px;
    color: #FAF6F6;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #0B132B;
}

.validation-messages {
    margin-top: 1rem;
    color: #FF6F6F;
    font-size: 0.875rem;
    list-style-type: none;
    padding: 0;
}

.validation-messages li {
    margin-bottom: 0.5rem;
}
</style>