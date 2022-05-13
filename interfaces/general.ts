import { LIGHT_COLORS } from '@/constants/colors';

export type TLIGHT_COLORS = keyof typeof LIGHT_COLORS;

export interface SvgIconProps {
    color?: string
}

export interface ILangData {
    ru: string;
    uk: string;
    en: string;
}