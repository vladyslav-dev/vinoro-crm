export type ButtonVariant = 'default' | 'outlined' | 'disabled';
export type ButtonType = 'button' | 'submit';
export type TransparentColor = 'transparent';
export type ButtonColor = 'default' | 'disabled' | 'danger' | 'success' | 'gold' | 'white';

export interface ButtonColorStyle {
    textColor?: ButtonColor;
    backgroundColor?: ButtonColor | TransparentColor;
    borderColor?: ButtonColor
}