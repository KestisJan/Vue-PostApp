import type { NotificationType } from "@/types/NotificationTypes";

export interface INotification {
    id: string
    text: string
    type: NotificationType
    timeout: number
}