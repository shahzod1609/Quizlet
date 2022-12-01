import React, { useState } from 'react'
import './PaginationCard.css';

const Pagination = ({ setPaginate ,postsPerPage, totalPosts}) => {
    const [currentPage, setCurrentPage] = useState(1)

    

    return (
        <nav aria-label="Page navigation example">
            <div className="pagination-cardsIn">
            { currentPage<totalPosts/postsPerPage && <a onClick={() => {
                    setCurrentPage(currentPage + 1);
                    setPaginate(currentPage + 1);
                }}>
                    <div className="known">Bilýan</div>
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
                    <div className="unknown">Bilemmok</div>
                </a>}
            </div>
            
            
        </nav>
    )
}
export default Pagination