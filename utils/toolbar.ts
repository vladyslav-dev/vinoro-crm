import { VIEW_ROW_LIST, VIEW_COLUMN_LIST } from '@/constants/index';

export const getViewMode = (router: any) => {
    const viewMode = router.query?.view ?? VIEW_ROW_LIST;

    const isRowView = viewMode === VIEW_ROW_LIST;
    const isColumnView = viewMode === VIEW_COLUMN_LIST;

    return { isRowView, isColumnView };
}