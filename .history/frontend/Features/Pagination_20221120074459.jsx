import React from "react";

import "./Pagination.css";

const Pagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
    nextPage,
    prevPage
}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        // <div className='pagination'>
        //     {pages.map((page, index) => {
        //         return (
        //             <button
        //                 key={index}
        //                 onClick={() => setCurrentPage(page)}
        //                 className={page == currentPage ? "active" : ""}>
        //                 {page}
        //             </button>
        //         );
        //     })}
        // </div>
        <div>
            <button onClick={prevPage} disabled={pages === 1}>Prev Page</button>
            <button onClick={nextPage} disabled={!totalPosts.length}>Next Page</button>
        </div>
    );
};

export default Pagination;
