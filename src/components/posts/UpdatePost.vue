<script setup lang="ts">
import { useAuthorsStore} from '@/stores/AuthorStore'
import { usePostsStore } from '@/stores/PostStore';
import { ref } from 'vue'
import { type IPost } from '@/interface/IPost';
import { type IAuthor } from '@/interface/IAuthors';

const emit = defineEmits(['close'])
const props = defineProps<{ id: number; callbackfn: () => void }>()

const authorsStore = useAuthorsStore()
const postStore = usePostsStore()
const post = ref<IPost | null>({} as IPost)
const title = ref('')
const body = ref('')
const validationMessage = ref<string[]>([])
const author = ref<IAuthor>()
const touched = ref(false)


const fetchPost = async () => {
    const fetchedPost = await postStore.getPost(props.id)
    post.value = fetchedPost

    if (fetchedPost && fetchedPost.title && fetchedPost.body && fetchedPost.authorId) {
        title.value = fetchedPost.title
        body.value = fetchedPost.body

        const fetchedAuthor = await authorsStore.getAuthor(fetchedPost.authorId)

        if (fetchedAuthor) {
            author.value = fetchedAuthor
        }
    }
}

const validate = () => {
    validationMessage.value.length = 0

    if (title.value.trim() === '') {
        validationMessage.value.push('Post title must not be empty!')
    }

    if (title.value.length > 50) {
        validationMessage.value.push('Title length may not be longer than 50 characters.')
    }

    if (body.value.trim() === '') {
        validationMessage.value.push('Post body must not be empty!')
    }

    if (body.value.length > 300) {
        validationMessage.value.push('Body length may not be longer than 300 characters.')
    }

    if (validationMessage.value.length > 0) {
        setTimeout(() => {
            validationMessage.value = [];
        }, 2500);
        return
    }
}

const updatePost = () => {
    validate()

    if (validationMessage.value.length === 0) {
        if (touched.value && post.value) {
            post.value.title = title.value
            post.value.body = body.value
            postStore.updatePost(post.value)
        }
        props.callbackfn()
        emit('close')
    }
}

fetchPost()

</script>


<template>
    <div class="form-container">
        <h3 class="form-title">Update Post</h3>
        <form @submit.prevent="updatePost">
            <input
                type="text"
                v-model="title"
                @keyup="touched = true"
                class="input-field"
                maxlength="50"
                placeholder="Title"
            />
            <textarea
                v-model="body"
                @keyup="touched = true"
                class="textarea-field"
                maxlength="250"
                placeholder="Body"
            ></textarea>
            <button type="submit" class="submit-button">Update</button>
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
    max-width: 500px;
    margin: 0 auto;
}

.form-title {
    color: #0B132B;
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.input-field {
    border: 1px solid #1C2541;
    border-radius: 4px;
    color: #0B132B;
    padding: 0.5rem;
    width: 100%;
    margin-bottom: 1rem;
    font-size: 1rem;
}

.input-field::placeholder {
    color: #1C2541;
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
