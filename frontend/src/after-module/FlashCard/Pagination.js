import React, { useState } from 'react'
import './PaginationCard.css';

const Pagination = ({  postsPerPage, setPaginate, totalPosts}) => {
    const [currentPage, setCurrentPage] = useState(1)



    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                { currentPage>1 && <a onClick={() => {
                    setCurrentPage(currentPage - 1);
                    setPaginate(currentPage - 1);
                }}>
                    <div className="prev-card"></div>
                    </a>}
                {
                    <div className="page-item">

                            {currentPage}/{Math.ceil(totalPosts/postsPerPage)}
                    </div>
                }
                { currentPage<totalPosts/postsPerPage && <a onClick={() => {
                    setCurrentPage(currentPage + 1);
                    setPaginate(currentPage + 1);
                }}>
                    <div className="next-card"></div>
                </a>}
            </ul>
        </nav>
    )
}
export default Pagination