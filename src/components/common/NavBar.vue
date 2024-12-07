<script setup lang="ts">
import { useCurrentUserStore } from '@/stores/CurrentUserStore';
import { useRouter } from 'vue-router';

const currentUserStore = useCurrentUserStore();
const router = useRouter();

const user = currentUserStore.currentUser


const logout = async () => {
    await currentUserStore.logout();
    router.push('/login');
}


</script>


<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
  
        <button class="navbar-burger" @click="toggleNavbar" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
  
      <div :class="{'navbar-menu': true, 'is-active': isNavbarActive}">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/authors">Authors</router-link>
          <router-link class="navbar-item" to="/posts">Posts</router-link>
        </div>
  
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <template v-if="!currentUserStore.currentUser">
                <router-link class="button is-primary" to="/register">
                  <strong>Register</strong>
                </router-link>
                <router-link class="button is-light" to="/login">
                  Log in
                </router-link>
              </template>
                <template v-if="currentUserStore.currentUser">
                    <div class="navbar-item user-info">
                        <span class="icon is-small">
                        <i class="fas fa-user"></i> 
                        </span>
                        <span class="username">{{ user.name }}</span>
                        <button class="button is-danger logout-button" @click="logout">
                        Log out
                        </button>
                    </div>
                </template>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </template>


<style scoped>
.navbar {
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6; 
    margin-bottom: 1rem;
}

.navbar-brand {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.navbar-burger {
    background: none;
    border: none;
    display: none; 
    cursor: pointer;
}

.navbar-burger span {
    display: block;
    width: 1.5rem;
    height: 2px;
    background-color: #333;
    margin: 3px 0;
}

.navbar-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navbar-item {
    padding: 0.5rem 1rem;
    color: #333; 
    text-decoration: none;
    font-size: 1rem;
}

.navbar-item:hover {
    color: #007bff; 
}

.user-info {
    display: flex;
    align-items: center;
}

.user-info .icon {
    margin-right: 0.5rem;
}

.user-info .username {
    margin-right: 1rem; 
    font-size: 1rem;
    color: #333;
}

.button.is-primary {
    background-color: #007bff; 
    color: #fff; 
    border: none;
}

.button.is-light {
    background-color: #fff;
    color: #007bff; 
    border: 1px solid #007bff; 
}

/* Danger button (for logout) */
.button.is-danger {
    background-color: #dc3545; /* Danger color */
    color: #fff; /* White text */
    border: none;
}

/* Hover and active states for buttons */
.button:hover {
    opacity: 0.9;
}

.button:active {
    opacity: 0.8;
}

/* Mobile view adjustments */
@media (max-width: 768px) {
    .navbar-menu {
        display: none; /* Hidden by default on mobile */
        flex-direction: column;
    }

    .navbar-menu.is-active {
        display: flex; /* Shown when burger menu is clicked */
    }

    .navbar-burger {
        display: flex; /* Show burger button on mobile */
    }
}
</style>