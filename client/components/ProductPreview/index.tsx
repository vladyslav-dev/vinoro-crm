/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './ProductPreview.module.scss';
import { EditIcon } from '@/components/Icons/EditIcon';
import Title from '../UI/Title';
import { IProductPreviewConfig } from '@/utils/form';

interface ProductPreviewProps {
    data: IProductPreviewConfig[];
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ data }) => {
    const router = useRouter();

    return (
        <div className={styles.preview}>
            <div className={styles.previewTitle}>
                <Title
                    rectColor={'COLOR_PERIWINKLE_GRAY'}
                    titleText={'Предпросмотр'}
                    styleType='FORM'
                />
            </div>
            <ul className={styles.previewList}>
                {data?.map((item: any, index: number) => (
                    <li
                        className={`
                            ${styles.previewItem}
                            ${item.data.value === item.IND ? styles.IND : ''}
                            ${item.isUpdated ? styles.updated : ''}
                        `}
                        key={index}
                    >
                        <Link href={`${router.pathname.replace('[id]', router.query.id as string)}#${item.path}`}>
                            <a>
                                <div className={styles.previewItemGroup}>
                                    <span className={styles.previewItemName}>{item.title}:</span>
                                    {item.type === 'image' && (item.data.value !== item.IND ? (
                                        <>
                                            <span className={styles.previewItemImage}>
                                                Изображение загружено
                                            </span>
                                            <img src={item.data.value || ''} alt={'Product preview'} />
                                        </>
                                    ) : (
                                        <span className={styles.previewItemValue}>{item.data.value}</span>
                                    ))}
                                    {(item.type === 'text' || item.type === 'boolean') && (
                                        <span className={`
                                            ${styles.previewItemValue}
                                            ${item.type === 'boolean' && !item.data.field ? styles.falsyValue : ''
                                        }`}>{item.data.value}</span>
                                    )}
                                </div>
                                <span className={styles.edited}>
                                    <EditIcon />
                                </span>
                                <span className={`${styles.previewItemIndicator} ${item.required ? styles.red : ''}`}></span>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProductPreview;