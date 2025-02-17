export type PaginationProps = {
    page: number;
    paginationCount: number;
    onPaginationClick: (event: React.MouseEvent<HTMLButtonElement>, page: number | null) => void;
    boundaryCount: number;
    disabled: boolean;
    hideNextButton: boolean;
    hidePrevButton: boolean;
    showFirstButton: boolean;
    showLastButton: boolean;
    siblingCount: number;
}