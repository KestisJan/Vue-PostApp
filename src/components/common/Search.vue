<script setup lang="ts">
import { type ISearchField } from '@/interface/ISearchField'
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps<{
    searchField: ISearchField[];
}>();

const emit = defineEmits<{
    (event: 'search', query: string): void;
}>();

const query = ref('')
const timeoutId = ref<number | null>(null);


const debounce = (callback: TimerHandler, delay: number) => {
    if (timeoutId.value !== null) clearTimeout(timeoutId.value);
    timeoutId.value = setTimeout(callback, delay);
}


const handleSearch = () => {
    debounce(() => {
        emit('search', query.value);
    }, 300)
}

const clearSearch = () => {
    query.value = ''
    handleSearch()
}



</script>


<template>
<div class="container">
    <div class="box">
        <div class="search">
            <input 
               class="form-control"
               v-model="query"
               type="text"
               placeholder="Search..."
               maxlength="200"
               @input="handleSearch"
            />
        </div>
        <button @click="clearSearch">Clear</button>
    </div>
</div>    
</template>

<style scoped>

</style>