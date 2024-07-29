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
    <div class="field has-addons">
        <div class="control is-expanded">
            <input 
               class="input"
               v-model="query"
               type="text"
               placeholder="Search..."
               maxlength="200"
               @input="handleSearch"
            />
        </div>
        <div class="control">
            <button class="button is-danger" @click="clearSearch">Clear</button>
        </div>
    </div>
</div>    
</template>

<style scoped>
.container {
    padding: 1rem;
    border-radius: 8px;
}

.input {
    border-color: #1C2541;
    color: #0B132B;
}

.input::placeholder {
  color: #1C2541;
}

.button {
  background-color: #1C2541;
  border-color: #1C2541;
  color: #FAF6F6;
}

.button:hover {
  background-color: #0B132B;
  border-color: #0B132B;
}
</style>