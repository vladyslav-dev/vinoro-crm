import Image from 'next/image'
import React from 'react'
import styles from './Img.module.scss'

interface ImgProps {
    src: string;
    secondSrc?: string;
    quality?: number;
    alt?: string;
}

const Img: React.FC<ImgProps> = (
    {
        src,
        quality = 75,
        alt = "Image not found",
        secondSrc = 'https://res.cloudinary.com/vinoro-media-storage/image/upload/v1626027250/vinoro/empty_xjuljc.jpg',
    }
) => {

    const [isImageReady, setIsImageReady] = React.useState(false);
    const [source, setSourse] = React.useState(src);

    return (
        <div className={styles.imageContainer}>
            <div className={`${styles.imageSkeleton} ${isImageReady ? styles.imageReady : null}`} />
            <div className={`${styles.imageWrapper} ${isImageReady ? styles.imageReady : null}`}>
                {src && (
                    <Image
                        onLoadingComplete={() => setIsImageReady(true)}
                        onError={() => setSourse(secondSrc)}
                        src={source}
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
