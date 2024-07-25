import type { IModalProps } from "@/interface/IModal";
import { defineStore } from "pinia";
import { markRaw, readonly, ref, type Component } from 'vue'


export const useModalStore = defineStore('modal-store', () => {
    const state = ref<IModalProps>({ component: null, props: {} })

    const openModal = (payload: IModalProps) => {
        const component: Component | null = payload?.component
            ? markRaw<Component>(payload.component)
            : null

        state.value = {
            component: component,
            props: payload.props || {}
        }
    }

    const closeModal = () => {
        state.value = { component: null, props: {} }
    }

    return { modalState: readonly(state), openModal, closeModal}
})