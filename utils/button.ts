import { COLORS } from '@/constants/index';
import { ButtonColorStyle } from '@/interfaces/button';

const buttonColors = {
    ['default']: COLORS.COLOR_DEFAULT,
    ['transparent']: COLORS.COLOR_TRANSPARENT,
    ['disabled']: COLORS.COLOR_DISABLED,
    ['danger']: COLORS.COLOR_DANGER,
    ['success']: COLORS.COLOR_SUCCESS,
    ['gold']: COLORS.COLOR_GOLD,
    ['white']: COLORS.COLOR_WHITE,
}

export const getButtonStyle = (color: ButtonColorStyle) => {
    return {
        ['default']: {
            backgroundColor: buttonColors[color?.backgroundColor || 'default'],
            borderColor: buttonColors[color?.borderColor || 'default'],
            color: buttonColors[color?.textColor || 'white'],
        },
        ['outlined']: {
            backgroundColor: buttonColors['transparent'],
            borderColor: buttonColors[color?.borderColor || 'default'],
            color: buttonColors[color?.textColor || 'default'],
        },
        ['disabled']: {
            backgroundColor: buttonColors['disabled'],
            borderColor: buttonColors['disabled'],
            color: buttonColors['white'],
            pointerEvents: 'none',
        }
    }
}