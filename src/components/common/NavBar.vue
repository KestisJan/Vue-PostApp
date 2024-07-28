<script setup lang="ts">

</script>

<template>
    <nav class="breadcrumb py-2 px-3" aria-label="breadcrumbs">
        <ul class="is-flex is-align-items-center breadcrumb-container is-flex-grow-1">
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
            <li class="is-flex-grow-1"></li> <!-- Empty li to push the next item to the right -->
            <li>
                <router-link to="/login" class="breadcrumb-item is-pulled-right">
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
.breadcrumb {
    border-radius: 4px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
}

.breadcrumb-container {
    margin: 0;
    padding: 0;
    list-style: none;
}

.breadcrumb-item {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: #4a4a4a;
    text-decoration: none;
}

.breadcrumb-item:hover {
    border-radius: 4px;
    color: #3273dc;
}

.breadcrumb-item .icon {
    margin-right: 0.5rem;
}

.breadcrumb-item .icon.is-small {
    font-size: 1rem;
}

.breadcrumb-item span {
    margin-left: 0.5rem;
}

.breadcrumb-item + .breadcrumb-item:before {
    content: "/";
    margin: 0 0.5rem;
    color: #b5b5b5;
}
</style>