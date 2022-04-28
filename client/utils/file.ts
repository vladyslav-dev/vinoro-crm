import resizeImage from 'resize-imagejs'

function dataURLtoFile(dataurl: string, filename: string) {

    let arr = dataurl.split(','),
        mime: any = arr[0].match(/:(.*?);/)![1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type: mime});
}


export const getBase64 = (file: any, resize: boolean = false) => {
    return new Promise(resolve => {

        if (resize) {
            const fileObject = dataURLtoFile(file, '')

            resizeImage(fileObject, { width: 1280, height: 1920, type: 'base64' })
            .then(base64 => {
                resolve(base64)
            })
        } else {
            resizeImage(file, { type: 'base64' })
            .then(base64 => {
                resolve(base64)
            })
        }
    });
}