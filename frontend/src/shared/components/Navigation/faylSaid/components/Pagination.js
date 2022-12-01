import React, { useState } from 'react'
import './Pagination.css';

const Pagination = ({ postsPerPage, totalPosts, paginate}) => {
    const [currentPage, setCurrentPage] = useState(1)


    let PageNumbers = []
    // const int = Math.ceil(totalPosts / postsPerPage)

    for(let i=(currentPage-1)*postsPerPage+1 ; i<=currentPage*postsPerPage ; i++)
        PageNumbers.push(i)
    
    // if (int === 1 ) return null 
    // console.log(int)
    // for (let i = 1; i<= int; i++) {
    //     PageNumbers.push(i) 
    // }



    return (
        <nav aria-label="Page navigation example">
            <div className="pagination">
                { currentPage>1 && <a className="a-prev" onClick={() => {
                    setCurrentPage(currentPage - 1);
                    paginate(currentPage - 1);
                }}>
                    Prev
                    </a>}
                {PageNumbers.map(number=> (
                    <div key={number} className="page-item">

                            {currentPage}/{totalPosts}
                    </div>
                ))}
                { currentPage<totalPosts/postsPerPage && <a className="a-next" onClick={() => {
                    setCurrentPage(currentPage + 1);
                    paginate(currentPage + 1);
                }}>
                    Next
                </a>}
            </div>
            
            
        </nav>
    )
}
export default Pagination