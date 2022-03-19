import React from 'react';
import { SvgIconProps } from '@/interfaces/general';

export const PackageIcon: React.FC<SvgIconProps> = ({ color }) => (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35.3738 13.3329L20.8422 6.06641L15.7617 8.60664L30.2933 15.8732L35.3738 13.3329Z" fill={color || "#282B30"}/>
        <path d="M10.6831 11.1465L6.3125 13.3323L20.8441 20.5974L25.2147 18.4126L10.6831 11.1465Z" fill={color || "#282B30"}/>
        <path d="M31.0024 16.9364V23.2121L28.4622 22.577L25.922 25.7523V19.4766L21.4766 21.6993V36.2309L36.0829 28.9281V14.3965L31.0024 16.9364Z" fill={color || "#282B30"}/>
        <path d="M5.60156 28.9281L20.2079 36.2309V21.6993L5.60156 14.3965V28.9281Z" fill={color || "#282B30"}/>
    </svg>
)