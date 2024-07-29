import type { INotification } from "@/interface/INotification";
import type { NotificationType } from "@/types/NotificationTypes";
import { defineStore } from "pinia";
import { ref, readonly } from 'vue'
import { v4 as uuidv4 } from 'uuid';


const defaultTimeout = 1000;

const createNotification = (text: string, type: NotificationType): INotification => ({
    id: uuidv4(),
    text,
    type,
    timeout: defaultTimeout
})

export const useNotificationStore = defineStore('notification', () => {
    const notifications = ref<INotification[]>([])

    const updateState = async(text: string, type: NotificationType) => {
        const notification = createNotification(text, type)
        notifications.value.push(notification)

        let totalTimeout = 0

        notifications.value.forEach( (n) => (totalTimeout += n.timeout) )
        const reaminingTime = totalTimeout - notification.timeout
        const extendedTimeout = notification.timeout + reaminingTime
        await new Promise( (resolve) => setTimeout(resolve, extendedTimeout))

        notifications.value = notifications.value.filter( (x) => x.id !== notification.id)
    }

    const success = async (text: string) => {
        await updateState(text, 'success')
    }

    const warning = async (text: string) => {
        await updateState(text, 'warning')
    }

    const danger = async (text: string) => {
        await updateState(text, 'danger')
    }

    return {
        notifications: readonly(notifications),
        success,
        warning,
        danger
    }
})