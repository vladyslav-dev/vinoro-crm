export type AlertType = 'success' | 'error'

export interface AlertProps {
    type: AlertType;
    textContent: string;
}

export interface AlertState extends AlertProps {
    isActive: boolean;
}
