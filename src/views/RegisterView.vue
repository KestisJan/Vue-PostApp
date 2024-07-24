<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import { useCurrentUserStore } from '@/stores/CurrentUserStore';

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const name = ref('')
const currentUser = useCurrentUserStore()
const router = useRouter()
const validationMessage = ref<string[]>([]);


const register = async () => {
    validate()

    if (validationMessage.value.length === 0 && (await currentUser.register(email.value, password.value, name.value))

    ) {
        router.push('/').then(() => {
            window.location.reload()
        });
    }

}

const validate = () => {
    validationMessage.value = [];

    const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const nameRegex = /^(\p{L}+(?: \p{L}+)*)$/u


    if (!nameRegex.test(name.value) && name.value !== '') {
        validationMessage.value.push('Name may only contain letters separated by spaces.')
    }
    if (name.value === '') {
        validationMessage.value.push('Name must not be empty!')
    }

    if (name.value.length > 100) {
        validationMessage.value.push('Name must not be longer than 100 characters!')
    }


    if (!email.value) {
        validationMessage.value.push('Email may not be empty!')
    }

    if (!email.value && !emailRegex.test(email.value)) {
        validationMessage.value.push('Please enter a valid email!')
    } 

    if (email.value.length > 200) {
        validationMessage.value.push('Email must not be longer than 200 characters!')
    }

    if (!password.value) {
        validationMessage.value.push('PAssword may not be empty')
    }

    if (password.value && password.value.length < 4) {
        validationMessage.value.push('Password may not be shorter than 4 characters!')
    }

    if (password.value.length > 100) {
        validationMessage.value.push('Password must not be longer than 100 characters!')
    }

    if (!confirmPassword.value) {
        validationMessage.value.push('Repeat Password may not be empty!')
    }

    if (confirmPassword.value.length > 100) {
        validationMessage.value.push('Repeat Password must not be longer than 100 characters!')
    }

    if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
        validationMessage.value.push('Passwords must match!')
    }
}

</script>

<template>
    <div class="container is-fluid is-fullwidth">
        <div class="box">
            <h1 class="title has-text-centered">
                <i class="fas fa-user-plus"></i> Register
            </h1>
            <form class="form">
                <div class="field">
                    <div class="control has-icons-left">
                        <input 
                            type="text" 
                            class="input is-fullwidth" 
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
                        type="email" 
                        class="input is-fullwidth" 
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
                        class="input is-fullwidth" 
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
                        class="input is-fullwidth" 
                        placeholder="Confirm Password"
                        v-model="confirmPassword"
                        />
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </div>
                </div>
                <div class="field">
                    <button class="button is-fullwidth is" @click="register">
                        <i class="fas fa-user-plus"></i> Register
                    </button>
                    <ul v-if="validationMessage.length">
                        <li v-for="(message, index) in validationMessage" :key="index">{{ message }}</li>
                    </ul>
                </div>
            </form>
            <div class="field-bot">
                <p>Already have an account?
                </p>
                <RouterLink to="/login" class="has-text-link">
                    Login here
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style>
</style>