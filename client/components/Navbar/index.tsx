import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import { useRouter } from "next/router";
import Link from 'next/link';
import userIcon from '@/images/icons/user-icon.svg';
import { images } from '@/constants/index';


import Modal from '@/components/UI/Modal';
import AdminInfo from '@/components/AdminInfo';

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = () => {

    const router = useRouter();
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <div className={styles.navbar}>
            <ul className={styles.navbar__menu}>
                {images.map((item, key) => (
                    <li key={key} className={`${styles.navbar__menu_item} ${router.pathname === item.url ? styles.active : ''}`}>
                        <Link href={item.url} passHref>
                            <a>
                                <Image src={item.icon} alt="Icon" />
                            </a>
                        </Link>
                        <span className={styles.navbar__menu_item_tooltip}>{item.tooltip}</span>
                    </li>
                ))}
                <li className={`${styles.navbar__menu_item} ${styles.navbar__profile}`} onClick={() => setShowModal(true)}>
                    <Image src={userIcon} alt="Icon" />
                </li>
            </ul>

            <Modal
                isActive={showModal}
                closeModal={() => setShowModal(false)}
                classNames={styles.modal}
            >
                <AdminInfo />
            </Modal>
        </div>
    )
}

export default Navbar;