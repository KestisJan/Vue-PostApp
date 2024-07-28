<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const emit = defineEmits(['update'])
const props = defineProps<{ totalItems: number}>()

const currentPage = ref(1)
const itemsPerPage = ref(5)

const itemsPerPageOption = [5, 10, 15, 20]

const totalPages = computed(() => Math.max(1, Math.ceil(props.totalItems / itemsPerPage.value)))

const emitPagination = () => {
    emit('update', { page: currentPage, limit: itemsPerPage.value})
}

const goToPreviousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
        emitPagination()
    }
}

const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
        emitPagination()
    }
}

watch (itemsPerPage, () => {
    currentPage.value = 1
    emitPagination()
})

watch (
    () => props.totalItems,
    (newValue, oldValue) => {
        if (newValue === 0) {
            currentPage.value = 1
            emitPagination()
        } else if (currentPage.value > totalPages.value) {
            currentPage.value = totalPages.value

            if (oldValue !== newValue) {
                currentPage.value = 1
            }

            emitPagination()
        }
    }
)

</script>

<template>
    <div class="">
        <button 
            class="button"
            @click="goToPreviousPage"
            :disabled="currentPage === 1 || totalPages === 0"
        >
        Previous
        </button>
        <span v-if="totalPages > 0">Page {{  currentPage }} of {{ totalPages }}</span>
        <span v-else>No Pages</span>
        <button 
            class="button"
            @click="goToNextPage"
            :disabled="currentPage === totalPages || totalPages === 0"
        >
        Next
        </button>
        <select
            v-model="itemsPerPage"
            @change="emitPagination"
            :disabled="totalPages === 0"
            class=""
        >
            <option v-for="option in itemsPerPageOption" :key="option" :value="option">{{ option }}</option>
        </select>
    </div>
</template>


<style>
</style>