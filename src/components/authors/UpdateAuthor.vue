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

</script>


<template>
    <div class="box">
        <h3 class="title is-4">Update Author</h3>
        <form @submit.prevent="editAuthor">
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input
                        type="text"
                        v-model="name"
                        @keyup="touched = true"
                        class="input"
                        maxlength="50"
                        placeholder="Enter name"
                    />
                    <input
                        type="text"
                        v-model="surname"
                        @keyup="touched = true"
                        class="input"
                        maxlength="50"
                        placeholder="Enter surname"
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