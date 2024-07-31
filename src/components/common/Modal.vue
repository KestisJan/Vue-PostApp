<script setup lang="ts">
import { useModalStore } from '@/stores/ModalStore';
import { computed } from 'vue'

const modalStore = useModalStore()
const isVisible = computed(() => modalStore.modalState.component !== null)


</script>

<template>
    <div v-if="isVisible" class="modal-mask">
        <div class="modal-container">
            <button class="close-button" @click="modalStore.closeModal">×</button>
            <component 
                :is="modalStore.modalState?.component"
                v-bind="modalStore.modalState?.props"
                @close="modalStore.closeModal"
            ></component>
        </div>
    </div>
</template>

<style scoped>
.modal-mask {
    display: grid;
    place-items: center;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1000; 
}

.modal-container {
    background-color: #ffffff; 
    padding: 2rem;
    width: 80vw;
    max-width: 500px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); 
    position: relative;
}

.close-button {
    background: none;
    border: none;
    color: #333;
    font-size: 1.5rem;
    font-weight: bold;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.close-button:hover {
    color: #FF6F6F; 
}

</style>
