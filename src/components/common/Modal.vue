<script setup lang="ts">
import { useModalStore } from '@/stores/ModalStore';
import { computed } from 'vue'

const modalStore = useModalStore()
const isVisible = computed(() => modalStore.modalState.component !== null)


</script>

<template>
    <div v-if="isVisible" class="modal-mask">
        <div class="modal-container">
            <button @click="modalStore.closeModal">x</button>
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
}

.modal-container {
    background-color: azure;
    padding: 1rem;
    width: 80vw;
    max-width: 500px;
}

</style>