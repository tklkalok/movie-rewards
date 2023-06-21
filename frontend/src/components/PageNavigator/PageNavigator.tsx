import { FC } from 'react';
import styles from './PageNavigator.module.css';

interface PageNavigatorProps {
    totalPage: number;
    currentPage: number;
    onChangePage: (pageNum: number)=>void;
}

export const PageNavigator:FC<PageNavigatorProps> = ({ totalPage, currentPage, onChangePage }) => {
    const windowSize = 5;
    let startPage = 1;
    let endPage = windowSize;

    if (currentPage > Math.floor(windowSize / 2)) {
        startPage = currentPage - Math.floor(windowSize / 2);
        endPage = currentPage + Math.floor(windowSize / 2);
    }

    if (endPage > totalPage) {
        endPage = totalPage;
        startPage = totalPage - windowSize + 1;
    }

    if (startPage < 1) {
        startPage = 1;
    }

    let buttonArray = [];
    for (let i = startPage; i <= endPage; i++) {
        buttonArray.push(i);
    }
    
    return (
    <>
        <div className={styles.pageNavigator}>
            {
                currentPage !== 1 && <button
                    className={styles.pageButton}
                    onClick={()=>{onChangePage(1)}}
                >{"|<"}</button>
            }
            {
                buttonArray.map((pageNum: number) => 
                    <button 
                        key={pageNum}
                        className={`${styles.pageButton} ${pageNum === currentPage ? styles.activePageButton : ''}`}
                        onClick={()=>{onChangePage(pageNum)}}
                    >{pageNum}</button>
                )
            }
            {
                totalPage != 0 && currentPage !== totalPage && <button
                    className={styles.pageButton}
                    onClick={()=>{onChangePage(totalPage)}}
                >{">|"}</button>
            }
        </div>
    </>
  )
}