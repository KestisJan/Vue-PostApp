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
    <div class="container">
        <h3 class="title">Create Author</h3>
        <form v-on:submit.prevent="createNewAuthor" class="form">
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