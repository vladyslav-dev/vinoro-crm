/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Search.module.scss';
import Link from 'next/link';
import { SearchIcon } from '@/components/Icons/SearchIcon';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { ISearchProduct } from '@/interfaces/product';
import { ISearchCategory } from '@/interfaces/category';
import { highlight } from '../../utils/search';

interface SearchProps {
    hideLogo: () => void;
    showLogo: () => void;
}

const Search: React.FC<SearchProps> = ({
    hideLogo,
    showLogo
}) => {

    const [searchQuery, setSearchQuery] = useState<string>('');

    const { products, category } = useSelector((state: RootState) => state.searchReducer);

    const dictionaryCategory = useMemo(() => {
        if (!category?.length) return {}
        return Object.assign({}, ...category?.map((item: ISearchCategory) => ({ [item.id]: item.category_name })))
    }, [category])

    const search = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) return

        const productResult: ISearchProduct[] = products.filter((item: ISearchProduct) => item.name['ru'].toLowerCase().includes(query));

        const result = productResult.reduce((acc: any, item) => {
            acc[item.category] = {
                categoryName: dictionaryCategory[item.category],
                products: acc[item.category] ? [...acc[item.category]['products'], item] : [item]
            }
            return acc
        }, {})

        const searchResult = Object.values(result)
        const totalProducts = searchResult.reduce((acc, item: any) => {
            acc += item.products.length
            return acc;
        }, 0) as number

        return { searchResult, totalProducts }

    }, [searchQuery]);

    const enlighten = useCallback(string => highlight(searchQuery, string), [searchQuery])

    useEffect(() => {
        if (!searchQuery.trim()) {
            showLogo()
        } else {
            hideLogo()
        }
    }, [searchQuery])


    const finishSearch = () => {
        setSearchQuery('');
        showLogo();
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.search}>
                <input
                    type={'text'}
                    placeholder='Поиск'
                    autoComplete="off"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
                <span className={`${styles.searchIcon} ${searchQuery ? styles.close : ''}`} onClick={() => setSearchQuery('')}>
                    <SearchIcon color='#70767D' />
                </span>
            </div>

            {search?.searchResult && (
                <div className={styles.searchOutput}>
                    <span className={styles.searchOutputLength}>Найдено: {search.totalProducts}</span>
                    <ul className={styles.searchList}>
                        {search.searchResult.map((item: any, key: any) => (
                            <li key={key} className={styles.searchItem}>
                                <span className={styles.searchItemCategory}>
                                    Категория: <span className={styles.categoryName}>{item.categoryName['ru']}</span>
                                </span>
                                <div className={styles.searchItemOutput}>
                                    {item.products.map((product: ISearchProduct, index: number) => {

                                        if (index < 5) {
                                            console.log(highlight(product.name['ru'], searchQuery))
                                            return (
                                                <Link href={`/edit-product/[id]`} as={`/edit-product/${product?.id}`} key={product.id}>
                                                    <a className={styles.itemOutputLink} onClick={finishSearch}>
                                                        <span className={styles.itemOutput}>
                                                            {enlighten(product.name['ru'])}
                                                        </span>
                                                    </a>
                                                </Link>
                                            )
                                        }
                                        if (item.products.length - 1 === index) {
                                            return (
                                                <Link href={`/category/[id]`} as={`/category/${product?.category}`} key={product.id}>
                                                    <a className={`${styles.searchItemCategory} ${styles.searchItemCategoryRest}`} onClick={finishSearch}>
                                                        ... еще {item.products.length - 5} в категории <span className={styles.categoryName}>
                                                        {dictionaryCategory[product.category]['ru']}</span>
                                                    </a>
                                                </Link>
                                            )
                                        }
                                    })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Search;