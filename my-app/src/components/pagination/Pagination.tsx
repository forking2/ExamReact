import {useMemo} from "react";
import {cn} from "@/utils/cn.ts";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
}

const averageVal = (a: number, b: number) => {
    return Math.floor((a+b)/2);
}

const Pagination = ({
                        currentPage,
                        totalPages,
                        onPageChange,
                        siblingCount = 1
                    }: PaginationProps) => {

    const paginationRange = useMemo(()=> {
        const totalPageNumbers = siblingCount * 2 + 5;
        if(totalPageNumbers >= totalPages){
            return Array.from({length: totalPages}, (_, i) => i+1);
        }
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        const shouldLeftDots = leftSiblingIndex > 2;
        const shouldRightDots = rightSiblingIndex < totalPages - 1;

        if(!shouldLeftDots && shouldRightDots) {
            const leftRange = Array.from(
                {length: 3 + 2 * siblingCount},
                (_, i) => i+1,
            )
            return [...leftRange, {isMiddleBtn: true, page: averageVal(leftRange.length - 1, lastPageIndex)}, lastPageIndex];
        }

        if(shouldLeftDots && !shouldRightDots){
            const rightRange = Array.from(
                {length: 3 + 2 * siblingCount},
                (_, i) => totalPages - (3 + 2 * siblingCount) + 1 + i,
            )

            return [firstPageIndex, {isMiddleBtn: true, page: averageVal(firstPageIndex, rightRange[0])}, ...rightRange]
        }

        if(shouldLeftDots && shouldRightDots){
            const middleRange = Array.from(
                {length: rightSiblingIndex - leftSiblingIndex + 1},
                (_, i) => leftSiblingIndex + i
            )
            return [
                firstPageIndex,
                {isMiddleBtn: true, page: averageVal(firstPageIndex, middleRange[0])},
                ...middleRange,
                {isMiddleBtn: true, page: averageVal(middleRange[middleRange.length - 1], lastPageIndex)},
                lastPageIndex
            ];
        }

        return []
    }, [currentPage, totalPages, siblingCount])

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg bg-[var(--bg-muted)] text-[var(--text)] hover:bg-[var(--border)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
                ←
            </button>

            {paginationRange.map((page, i) =>
                typeof page !== 'number' && page?.isMiddleBtn ? (
                    <button key={i}
                            onClick={() => onPageChange(page?.page as number)}
                            className="px-3 py-1 rounded-lg bg-[var(--bg-muted)] text-[var(--text-muted)] hover:bg-[var(--border)] hover:text-[var(--text)] transition-colors">
                        ...
                    </button>
                ) : (
                    <button
                        key={i}
                        onClick={() => onPageChange(page as number)}
                        className={cn(
                            "px-3 py-1 rounded-lg transition-colors",
                            page === currentPage
                                ? "bg-violet-500 text-white"
                                : "bg-[var(--bg-muted)] text-[var(--text)] hover:bg-[var(--border)]"
                        )}
                    >
                        {page as number}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg bg-[var(--bg-muted)] text-[var(--text)] hover:bg-[var(--border)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
                →
            </button>
        </div>
    );
};

export default Pagination;