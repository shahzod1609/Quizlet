import { useEffect, useState } from "react"
import './index.css'
import data from './MOCK_DATA.json'
import Posts from './components/Posts';
import Pagination from './components/Pagination';





const App = () => {

//==========================================
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);





  const [postsPerPage] = useState(1);

  useEffect(()=>{
    const fetchPosts = async () => {
      setLoading(true);
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);
//============================================
  //get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

// Change page

const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="c1">
      {Number}
      <Pagination  currentPage={currentPage} totalPosts={posts.length} paginate={paginate} postsPerPage={postsPerPage} />
      <Posts posts={currentPosts} loading={loading}  />
     
    </div>
  );
};

export default App;
