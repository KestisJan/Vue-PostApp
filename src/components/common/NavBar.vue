<script setup lang="ts">

</script>

<template>
    <nav class="breadcrumb py-2 px-3" aria-label="breadcrumbs">
        <ul class="is-flex is-align-items-center breadcrumb-container">
            <li>
                <router-link to="/authors" class="breadcrumb-item">
                    <span class="icon is-small">
                        <i class="fas fa-user"></i>
                    </span>
                    <span>Authors</span>
                </router-link>
            </li>
            <li>
                <router-link to="/posts" class="breadcrumb-item">
                    <span class="icon is-small">
                        <i class="fas fa-newspaper"></i>
                    </span>
                    <span>Posts</span>
                </router-link>
            </li>
            <li>
                <router-link to="/login">
                    <span class="icon is-small">
                        <i class="fas fa-lock"></i>
                    </span>
                    <span>Login</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>


<style scoped>

</style>