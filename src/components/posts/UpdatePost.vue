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
            props.callbackfn()
        }
        emit('close')
    }
}

</script>


<template>
    <div class="box">
        <h3 class="title is-4">Update Post</h3>
        <form @submit.prevent="updatePost">
            <div class="field">
                <label class="label">Title</label>
                <div class="control">
                    <input
                        type="text"
                        v-model="title"
                        @keyup="touched = true"
                        class="input"
                        maxlength="50"
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        v-model="body"
                        @keyup="touched = true"
                        class="input"
                        maxlength="50"
                        placeholder="Body"
                    />
                    <button type="submit" class="button">Update</button>
                    <ul v-if="validationMessage.length">
                        <li v-for="(message, index) in validationMessage" :key="index">{{ message }}</li>
                    </ul>
                </div>
            </div>

        </form>
    </div>
</template>