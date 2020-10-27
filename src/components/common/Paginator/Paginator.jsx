import React, { useState } from "react";
import s from "./Paginator.module.css";

let Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / pageSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * pageSize + 1;
    let rightPortionPageNumber = portionNumber * pageSize;

    return (
        <div className={s.flex_pages}>
            <button
                style={portionNumber > 1 ? { opacity: 1 } : { opacity: 0 }}
                disabled={portionNumber > 1 ? false : true}
                className={s.btn_back}
                onClick={() => {
                    setPortionNumber(portionNumber - 1);
                }}
            >
                Back
            </button>
            {pages
                .filter(
                    (p) =>
                        p >= leftPortionPageNumber &&
                        p <= rightPortionPageNumber
                )
                .map((p) => {
                    return (
                        <span key={p}
                            onClick={() => {
                                onPageChanged(p);
                            }}
                            className={
                                currentPage === p ? s.activePage : s.pages
                            }
                        >
                            {p}
                        </span>
                    );
                })}
            <button
                style={portionCount > portionNumber ? { opacity: 1 } : { opacity: 0 }}
                disabled={portionCount > portionNumber ? false : true}
                className={s.btn_next}
                onClick={() => {
                    setPortionNumber(portionNumber + 1);
                }}
            >
                Next
            </button>
        </div>
    );
};

export default Paginator;
