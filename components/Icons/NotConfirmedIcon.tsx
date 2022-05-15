import React from 'react';
import { SvgIconProps } from '@/interfaces/general';

export const NotConfirmedSvg: React.FC<SvgIconProps> = ({ color }) => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.9995 2.0957C10.3097 2.0957 9.68579 2.43424 9.32655 3.03214L0.788821 17.2624C0.429578 17.8623 0.437496 18.5999 0.797751 19.199C1.12066 19.736 1.7251 20.1373 2.41614 20.1354H19.583C20.2741 20.1383 20.8788 19.736 21.2014 19.199C21.5617 18.5997 21.5698 17.8621 21.2104 17.2624L12.6726 3.03214C12.3134 2.434 11.6895 2.0957 10.9996 2.0957H10.9995ZM10.9995 3.84159C11.055 3.84159 11.1583 3.90918 11.1723 3.93252L19.71 18.1628C19.724 18.1861 19.724 18.2758 19.71 18.2991C19.6586 18.3846 19.6386 18.3903 19.5827 18.3901H2.41583C2.36022 18.3903 2.33993 18.3846 2.28858 18.2991C2.27457 18.2758 2.27457 18.1861 2.28858 18.1628L10.8263 3.93252C10.8403 3.90918 10.9436 3.84159 10.999 3.84159H10.9995ZM10.9995 7.33311C10.196 7.33311 9.54472 7.98441 9.54472 8.78794L9.83577 13.1524C9.83577 13.7952 10.3568 14.3162 10.9995 14.3162C11.6423 14.3162 12.1633 13.7952 12.1633 13.1524L12.4543 8.78794C12.4543 7.98441 11.803 7.33311 10.9995 7.33311H10.9995ZM10.9995 14.8982C10.196 14.8982 9.54472 15.5495 9.54472 16.353C9.54472 17.1565 10.196 17.8078 10.9995 17.8078C11.8031 17.8078 12.4544 17.1565 12.4544 16.353C12.4544 15.5495 11.8031 14.8982 10.9995 14.8982Z" fill={color || '#D0021B'}/>
    </svg>
)