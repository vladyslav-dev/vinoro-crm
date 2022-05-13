import { IProduct } from "@/interfaces/product";

export const reorderProducts = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const compareProductList = (arr1: Array<IProduct>, arr2: Array<IProduct>) => (
    arr2.filter((_, index) => !!arr1.filter(() => {
        return arr2[index].id !== arr1[index].id
    }).length)
);