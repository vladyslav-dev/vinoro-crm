import Image from 'next/image'
import React from 'react'
import styles from './Img.module.scss'

interface ImgProps {
    src: string;
    quality?: number;
    alt?: string;
}

const Img: React.FC<ImgProps> = (
    {
        src,
        quality = 5,
        alt = "Image not found",
    }
) => {

    const [isImageReady, setIsImageReady] = React.useState(false);

    return (
        <div className={styles.imageContainer}>
            <div className={`${styles.imageSkeleton} ${isImageReady ? styles.imageReady : null}`} />
            <div className={`${styles.imageWrapper} ${isImageReady ? styles.imageReady : null}`}>
                {src && (
                    <Image
                        onLoadingComplete={() => setIsImageReady(true)}
                        src={src}
                        layout="fill"
                        lazyBoundary="1200px"
                        className={`${styles.image}`}
                        quality={quality}
                        alt={alt}
                    />
                )}

            </div>

        </div >
    )
}

export default Img
