<script setup lang="ts">
defineProps({
    show: Boolean,
});

const emit = defineEmits(['close', 'save']);



</script>

<template>
    <div v-if="show" class="modal-mask">
        <div class="modal-container">
            <div class="field">
                <slot name="form">
                </slot>
            </div>
            <hr/>
            <footer>
                <slot name="footer">
                    <button @click="$emit('close')">Close</button>
                    <button @click="$emit('save')">Save</button>
                </slot>
            </footer>
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