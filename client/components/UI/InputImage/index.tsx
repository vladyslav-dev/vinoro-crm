/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from 'react';
import styles from './InputImage.module.scss';
import { UploadIcon } from '@/components/Icons/UploadIcon';
import { getBase64 } from '@/utils/file';

interface InputImageProps {
    image: string;
    changeHandler: (dataBaseImage: string) => void;
    label?: string;
}

const InputImage: React.FC<InputImageProps> = ({
    image,
    changeHandler,
    label = 'Default label',
}) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const inputDropArea = useRef<HTMLDivElement>(null);

    const [isHighlighted, setIsHiglighed] = useState<boolean>(false);

    const fileHandler = (files: any) => {
        if (files.length) {
            const file = files[0];
            getBase64(file).then((dataBaseImage) => {
                changeHandler!(dataBaseImage as string)
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
    )
}

export default InputImage;