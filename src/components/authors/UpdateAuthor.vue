<script setup lang="ts">
import { useAuthorsStore} from '@/stores/AuthorStore'
import { ref } from 'vue'
import { type IAuthor } from '@/models/IAuthor'

const emit = defineEmits(['close'])
const props = defineProps<{ id: number; callbackfn: () => void }>()
const authorsStore = useAuthorsStore()
const author = ref<IAuthor | null>([] as IAuthor)
const name = ref('')
const surname = ref('')
const validationMessage = ref<string[]>([])
const touched = ref(false)


const fetchAuthors = async () => {
    const fetchedAuthor = await authorsStore.getAuthor(props.id)
    author.value = fetchedAuthor

    if (fetchedAuthor && fetchedAuthor.name && fetchedAuthor.surname) {
        name.value = fetchedAuthor.name
        surname.value = fetchedAuthor.surname
    }
}

const validate = () => {
    validationMessage.value.length = 0

    const nameRegex = /^\p{L}+$/u

    if (!nameRegex.test(name.value) && name.value !== '') {
        validationMessage.value.push('Name may only contain letters.')
    }

    if (!nameRegex.test(surname.value) && surname.value !== '') {
        validationMessage.value.push('Surname may only contain letters.')
    }

    if (name.value === '' ) {
        validationMessage.value.push('Name must not be empty!')
    }

    if (surname.value === '' ) {
        validationMessage.value.push('Surname must not be empty!')
    }

    if (name.value.length > 50 ) {
        validationMessage.value.push('Name must not be longer than 50 characters!')
    }    

    if (surname.value.length > 50 ) {
        validationMessage.value.push('Surname must not be longer than 50 characters!')
    }
}

const editAuthor = () => {
    validate()

    if (author.value != null && validationMessage.value.length === 0) {
        if (touched.value) {
            author.value.name = name.value
            author.value.surname = surname.value

            authorsStore.updateAuthor(author.value)
        }
        props.callbackfn()
        emit('close')
    }
}

fetchAuthors()

</script>


<template>
    <div class="container">
        <h3 class="title">Update Author</h3>
        <form @submit.prevent="editAuthor" class="form">
            <input
                type="text"
                v-model="name"
                @keyup="touched = true"
                class="input-field"
                maxlength="50"
                placeholder="Enter name"
            />
            <input
                type="text"
                v-model="surname"
                @keyup="touched = true"
                class="input-field"
                maxlength="50"
                placeholder="Enter surname"
            />
            <button type="submit" class="submit-button">Update</button>
            <ul v-if="validationMessage.length" class="validation-messages">
                <li v-for="(message, index) in validationMessage" :key="index">{{ message }}</li>
            </ul>
        </form>
    </div>
</template>


<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    border-radius: 8px;
}

.title {
    color: #0B132B;
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.input-field {
    padding: 0.75rem;
    border: 1px solid #1C2541;
    border-radius: 4px;
    font-size: 1rem;
    color: #0B132B;
    background-color: #FFFFFF;
}

.input-field::placeholder {
    color: #B0B0B0;
}

.submit-button {
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #0B132B;
    color: #FAF6F6;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

.submit-button:hover {
    background-color: #1C2541;
}

.submit-button:active {
    transform: scale(0.98);
}

.validation-messages {
    margin-top: 1rem;
    padding: 0.5rem;
    background-color: #FFE4E4;
    border: 1px solid #FF4C4C;
    border-radius: 4px;
    color: #FF4C4C;
    list-style: none;
}

.validation-messages li {
    margin-bottom: 0.5rem;
}
</style>