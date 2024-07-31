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
    } else if (!emailRegex.test(email.value)) {
        validationMessage.value.push('Please enter a valid email!')
    } 

    if (email.value.length > 200) {
        validationMessage.value.push('Email must not be longer than 200 characters!')
    }

    if (!password.value) {
        validationMessage.value.push('Password may not be empty!')
    } else if (password.value.length < 4) {
        validationMessage.value.push('Password may not be shorter than 4 characters!')
    }

    if (password.value.length > 100) {
        validationMessage.value.push('Password must not be longer than 100 characters!')
    }
}

</script>


<template>
    <div class="container is-fluid is-fullwidth is-flex is-justify-content-center mt-6">
      <div class="box">
        <h1 class="title has-text-centered">
          <i class="fas fa-sign-in-alt"></i> Login
        </h1>
        <form @submit.prevent="login" class="form">
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
            <div class="control">
              <button class="button is-primary is-fullwidth" type="submit">
                <i class="fas fa-sign-in-alt"></i> Login
              </button>
            </div>
            <ul v-if="validationMessage.length" class="has-text-danger mt-2">
              <li v-for="(message, index) in validationMessage" :key="index">{{ message }}</li>
            </ul>
          </div>
        </form>
        <div class="field has-text-centered mt-4">
          <p>Don't have an account yet?</p>
          <RouterLink to="/register" class="has-text-link">
            Register here
          </RouterLink>
        </div>
      </div>
    </div>
  </template>
  
  
  <style scoped>
 .container {
  padding: 10em;
}

.box {
  background-color: #FAF6F6;
  border-radius: 8px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 1.2); 
  width: 500px;
  padding: 4em;
  transition: transform 0.3s, box-shadow 0.3s; /* Smooth transition */
}

.box:hover {
  transform: scale(1.02); /* Slightly increase the size */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Add more shadow */
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
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
}

.control {
  width: 100%;
}
  </style>