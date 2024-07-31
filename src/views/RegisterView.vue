<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import { useCurrentUserStore } from '@/stores/CurrentUserStore';

const emit = defineEmits(['close'])
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const name = ref('')
const currentUser = useCurrentUserStore()
const router = useRouter()
const validationMessage = ref<string[]>([]);

const register = async () => {
    validate()

    if (validationMessage.value.length === 0 && (await currentUser.register(email.value, password.value, name.value))) {
        router.push('/')
        emit('close')
    }
}

const validate = () => {
    validationMessage.value = [];

    const emailRegex = 
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const nameRegex = /^(\p{L}+(?: \p{L}+)*)$/u

    if (!name.value) {
        validationMessage.value.push('Name must not be empty!')
    } else if (!nameRegex.test(name.value)) {
        validationMessage.value.push('Name may only contain letters separated by spaces.')
    }

    if (name.value.length > 100) {
        validationMessage.value.push('Name must not be longer than 100 characters!')
    }

    if (!email.value) {
        validationMessage.value.push('Email may not be empty!')
    } else if (!emailRegex.test(email.value)) {
        validationMessage.value.push('Please enter a valid email!')
    }

    if (email.value.length > 200) {
        validationMessage.value.push('Email must not be longer than 200 characters!')
    }

    if (!password.value) {
        validationMessage.value.push('Password may not be empty')
    } else if (password.value.length < 4) {
        validationMessage.value.push('Password may not be shorter than 4 characters!')
    }

    if (password.value.length > 100) {
        validationMessage.value.push('Password must not be longer than 100 characters!')
    }

    if (!confirmPassword.value) {
        validationMessage.value.push('Repeat Password may not be empty!')
    } else if (confirmPassword.value.length > 100) {
        validationMessage.value.push('Repeat Password must not be longer than 100 characters!')
    }

    if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
        validationMessage.value.push('Passwords must match!')
    }

    if (validationMessage.value.length > 0) {
        setTimeout(() => {
            validationMessage.value = [];
        }, 5000); 
    }
}
</script>

<template>
    <div class="container is-fluid is-fullwidth is-flex is-justify-content-center">
        <div class="box" style="max-width: 500px; width: 100%;">
            <h1 class="title has-text-centered">
                <i class="fas fa-user-plus"></i> Register
            </h1>
            <form @submit.prevent="register" class="form">
                <div class="field">
                    <div class="control has-icons-left">
                        <input 
                            type="text"
                            class="input"
                            placeholder="Name"
                            v-model="name"
                        />
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                    </div>
                </div>
                <div class="field">
                    <div class="control has-icons-left">
                        <input
                            type="text"
                            class="input"
                            placeholder="Email"
                            v-model="email"
                        />
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                    </div>
                </div>
                <div class="field">
                    <div class="control has-icons-left">
                        <input
                            type="password"
                            class="input"
                            placeholder="Password"
                            v-model="password"
                        />
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </div>
                </div>
                <div class="field">
                    <div class="control has-icons-left">
                        <input
                            type="password"
                            class="input"
                            placeholder="Confirm Password"
                            v-model="confirmPassword"
                        />
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </div>
                </div>
                <div class="field">
                    <button class="button is-fullwidth is-primary" type="submit">
                        <i class="fas fa-user-plus"></i> Register
                    </button>
                    <ul v-if="validationMessage.length" class="has-text-danger mt-2">
                        <li v-for="(message, index) in validationMessage" :key="index">{{ message }}</li>
                    </ul>
                </div>
            </form>
            <div class="field-bot has-text-centered mt-4">
                <p>Already have an account?</p>
                <RouterLink to="/login" class="has-text-link">
                    Login here
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    padding: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.box {
    background-color: #FAF6F6; 
    border-radius: 8px; 
    padding: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); 
    transition: transform 0.3s, box-shadow 0.3s; 
    max-width: 500px;
}

.box:hover {
    transform: scale(1.02); 
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); 
}

.title {
    color: #0B132B; 
}

.input {
    border-color: #1C2541; 
    background-color: #FAF6F6; 
}

.button.is-primary {
    margin: 0;
    margin-top: 2em;
    background-color: #0B132B; 
    border-color: #0B132B; 
    color: #FAF6F6;
}

.button.is-primary:hover {
    background-color: #1C2541; 
    border-color: #1C2541;
}

.has-text-danger {
    color: #d9534f;
}

.field-bot {
    margin-top: 20px;
    color: #0B132B; 
}

.has-text-link {
    color: #1C2541;
}

.has-text-link:hover {
    color: #0B132B; 
}

.icon.is-small.is-left {
    color: #0B132B; 
}
</style>