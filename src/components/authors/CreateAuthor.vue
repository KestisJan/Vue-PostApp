<script setup lang="ts">
import { useAuthorsStore } from '@/stores/AuthorStore';
import { ref } from 'vue'

const emit = defineEmits(['close'])
const props = defineProps<{ callbackfn: () => void}>()

const authorStore = useAuthorsStore()
const name = ref('')
const surname = ref('')
const validationMessage = ref<string[]>([]) 

const createNewAuthor = () => {
    validate()

    if (validationMessage.value.length === 0) {
        authorStore.addAuthor(name.value, surname.value)
        props.callbackfn
        emit('close')
    }
}

const validate = () => {
    validationMessage.value = [];
    const nameRegex = /^\p{L}+$/u

    if (!nameRegex.test(name.value) && name.value !== '') {
        validationMessage.value.push('Name may only contain letters.')
    }

    if (!nameRegex.test(surname.value) && surname.value !== '' ) {
        validationMessage.value.push('Surname may only contain letters.')
    }

    if (!name.value.trim()) {
        validationMessage.value.push('Name is required');
    }

    if (!surname.value.trim()) {
        validationMessage.value.push('Surname is required');
    }

    if (name.value.length > 50) {
        validationMessage.value.push('Name must not be longer than 50 characters')
    }

    if (surname.value.length > 50) {
        validationMessage.value.push('Surname must not be longer than 50 characters')
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
    <div>
        <h3>Create Author</h3>
        <form v-on:submit.prevent="createNewAuthor">
            <input
                type="text"
                v-model="name"
                placeholder="Name"
                class="input-field"
                maxlength="50"
            />
            <input 
                type="text"
                v-model="surname"
                placeholder="Surname"
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