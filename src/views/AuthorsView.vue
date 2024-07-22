<script setup lang="ts">
import { useAuthorsStore} from '@/stores/AuthorStore'
import { type IAuthor } from '@/interface/IAuthors';
import { ref } from 'vue'
import AuthorsCard from '@/components/authors/AuthorsCard.vue';

const authorsStore = useAuthorsStore()
const authors = ref<IAuthor[]>([]);
const isLoading = ref(true)


const loadData = async () => {
    isLoading.value = true;
    authors.value = [];

    const response = await authorsStore.fetchAuthors()
    if (response) {
        authors.value = response.data as IAuthor[]
    }

    isLoading.value = false
}   

loadData()
</script>

<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
        <div class="container">
            <div v-if="isLoading">Loading</div>
            <AuthorsCard v-else :authors="authors"/>
        </div>
    </div>
  </div>
</template>


<style scoped>

</style>