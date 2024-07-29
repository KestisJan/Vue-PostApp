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
            <div class="confirm-button" @click="confirm">Yes</div>
            <div class="cancel-button" @click="cancel">No</div>
        </div>
    </div>
</template>