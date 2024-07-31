<script setup lang="ts">

const props = defineProps<{
    title: string
    message: string
    callbackfn: (confirmed: boolean) => void
}>()

const confirm = () => {
    props.callbackfn(true)
}

const cancel = () => {
    props.callbackfn(false)
}
</script>


<template>
    <div class="confirmation-window">
        <h3 class="title">{{ title }}</h3>
        <p class="message">{{ message }}</p>
        <div class="button-group">
            <button class="confirm-button" @click="confirm">Yes</button>
            <button class="cancel-button" @click="cancel">No</button>
        </div>
    </div>
</template>


<style scoped>
.confirmation-window {
    background-color: #ffffff;
    padding: 2rem;
    width: 100%;
    max-width: 500px;
    border-radius: 10px;
    text-align: center;
}

.title {
    color: #0B132B;
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.message {
    color: #1C2541;
    font-size: 1rem;
    margin-bottom: 1.5rem;
}

.button-group {
    display: flex;
    justify-content: space-around;
    margin-top: 1.5rem;
}

.confirm-button,
.cancel-button {
    background-color: #1C2541;
    border: none;
    border-radius: 4px;
    color: #FAF6F6;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    width: 45%; 
    text-align: center;
}

.confirm-button:hover,
.cancel-button:hover {
    background-color: #0B132B;
}

</style>