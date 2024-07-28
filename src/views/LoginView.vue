<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import { useCurrentUserStore } from '@/stores/CurrentUserStore';

const email = ref('')
const password = ref('')
const currentUser = useCurrentUserStore()
const router = useRouter()
const validationMessage = ref<string[]>([]);


const login = async () => {
    validate()

    if (validationMessage.value.length === 0 && (await currentUser.login(email.value, password.value))

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
}

</script>


<template>
    <div class="container is-fluid is-fullwidth is-flex is-justify-content-center mt-6">
       <div class="box" style="max-width: 400px; width: 100%;">
            <h1 class="title has-text-centered">
                <i class="fas fa-sign-in-alt"></i> Login
            </h1>
            <form class="form">
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
                    <button class="button is-primary is-fullwidth" @click="login">
                        <i class="fas fa-sign-in-alt"></i> Login
                    </button>
                    <ul v-if="validationMessage.length" class="has-text-danger mt-2">
                        <li v-for="(message, index) in validationMessage" :key="index">{{ message }}</li>
                    </ul>
                </div>
            </form>
       </div> 
    </div>
</template>

<style scoped>
.container {
    margin-top: 3rem;
}

.box {
    width: 100%;
    max-width: 400px;
}

.field-bot {
    text-align: center;
    margin-top: 1rem;
}

.button {
    margin-top: 1rem;
}

ul {
    margin-top: 1rem;
    padding-left: 1rem;
}
</style>