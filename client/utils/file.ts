export const getBase64 = (file: any) => {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader?.result as string);
        };
    });
}
