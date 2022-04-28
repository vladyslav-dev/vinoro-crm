/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './InputImage.module.scss';
import { UploadIcon } from '@/components/Icons/UploadIcon';
import Cropper from "react-easy-crop";
import { Point } from "react-easy-crop/types";
import { getBase64 } from '@/utils/file';
import getCroppedImg from '@/utils/cropImage';
import Button from '../Button';
import Loader from '@/components/UI/Loader';
import Portal from '@/components/Portal';

interface InputImageProps {
    image: string;
    label?: string;
    changeHandler: (dataBaseImage: string) => void;
}

const InputImage: React.FC<InputImageProps> = ({
    image,
    changeHandler,
    label = 'Default label',
}) => {

    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const [file, setFile] = useState<string>('');
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, [])

      const cropHandler = useCallback(async () => {

        try {
            setIsUpdate(true);
            const base64 = await getCroppedImg(
              file,
              croppedAreaPixels,
            )

            setTimeout(() => {
                changeHandler(base64 as string)
                setFile('')
                setIsUpdate(false)
            }, 800)

          } catch (e) {
            console.error(e)
          }


      }, [file, croppedAreaPixels])

    const cancelHandler = () => {
        setCroppedAreaPixels(null)
        setFile('')
    }

    const inputRef = useRef<HTMLInputElement>(null);
    const inputDropArea = useRef<HTMLDivElement>(null);

    const [isHighlighted, setIsHiglighed] = useState<boolean>(false);

    const fileHandler = (files: any) => {
        if (files.length) {
            const file = files[0];
            getBase64(file).then((dataBaseImage) => {
                setFile(dataBaseImage as string)
            })
        }
    }

    const handleDrop = (event: any) => {
        fileHandler(event.dataTransfer.files);
    }

    const preventDefaults = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
    }

    const highlight = () => setIsHiglighed(true);
    const unhighlight = () => setIsHiglighed(false);

    useEffect(() => {
        const dropArea = inputDropArea?.current;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea?.addEventListener(eventName, preventDefaults, false)
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea?.addEventListener(eventName, highlight, false)
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea?.addEventListener(eventName, unhighlight, false)
        });

        dropArea?.addEventListener('drop', handleDrop, false);

        return () => {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropArea?.removeEventListener(eventName, preventDefaults, false)
            });

            ['dragenter', 'dragover'].forEach(eventName => {
                dropArea?.removeEventListener(eventName, highlight, false)
            });

            ['dragleave', 'drop'].forEach(eventName => {
                dropArea?.removeEventListener(eventName, unhighlight, false)
            });

            dropArea?.removeEventListener('drop', handleDrop, false);
        }
    }, [])

    return (
        <>
            <div className={styles.inputWrapper}>
                <label className={styles.label}>{label}</label>
                <input
                    type="file"
                    ref={inputRef}
                    multiple={false}
                    accept="image/png,image/jpg,image/jpeg"
                    placeholder=" "
                    onChange={(event) => {
                        fileHandler(event.target.files);
                        event.target.value = '';
                    }}
                    className={styles.input}
                />
                <div
                    className={`
                    ${styles.inputPreview}
                    ${isHighlighted ? styles.highlight : '' }
                    ${image ? styles.active : ''}
                    `}
                    onClick={() => inputRef?.current?.click()}
                    ref={inputDropArea}
                >
                    {image && <img src={image} alt="Product preview" />}
                    <button className={styles.inputPreviewButton}>
                        <UploadIcon />
                        <span>Загрузить файл</span>
                    </button>
                </div>
            </div>
            <Portal>
                {file && (
                    <div className={`${styles.cropBackground} ${isUpdate ? styles.update : ''}`}>
                        <div className={`${styles.crop}`}>
                            {isUpdate ? (
                                <Loader type='bubbles' />
                            ) : (
                                <Cropper
                                    image={file}
                                    crop={crop}
                                    aspect={2 / 3}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    classes={{ containerClassName: styles.cropContainer }}
                                />
                            )}

                        </div>
                        {!isUpdate && (
                            <div className={styles.cropController}>
                                <Button innerText='Отменить' variant='outlined' clickHandler={cancelHandler} />
                                <Button innerText='Сохранить' clickHandler={cropHandler} />
                            </div>
                        )}
                    </div>
                )}
            </Portal>
        </>
    )
}

export default InputImage;