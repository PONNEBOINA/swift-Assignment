import { useState,useEffect } from "react";
import DashboardTable from "../components/DashboardTable"
import Pagination from "../components/Pagination"
import SearchBar from "../components/SearchBar"
import { saveToStorage,loadFromStorage } from "../utils/storage";
import { useNavigate } from "react-router";
import "./index.css"

const Dashboard = ()=>{
    const [comments,setComments]  = useState([])
    const [filtered,setFiltered] = useState([])
    const [search,setSearch] = useState(loadFromStorage("search") || "")
    const [sortConfig, setSortConfig] = useState(loadFromStorage('sort') || null);
    const [pageSize, setPageSize] = useState(loadFromStorage('pageSize') || 10);
    const [currentPage, setCurrentPage] = useState(loadFromStorage('currentPage') || 1);

    const navigate = useNavigate()

    useEffect(()=>{
           fetch('https://jsonplaceholder.typicode.com/comments')
        .then(res=>res.json())
        .then(data => {
            setComments(data);
            setFiltered(data);
      });

    },[])

     useEffect(() => {
    saveToStorage('search', search);
    saveToStorage('sort', sortConfig);
    saveToStorage('pageSize', pageSize);
    saveToStorage('currentPage', currentPage);
  }, [search, sortConfig, pageSize, currentPage]);

  const handleSearch = (input) => {
  setSearch(input);
  const lowerInput = input.toLowerCase();

  const filteredData = comments.filter(item =>
    item.name.toLowerCase().includes(lowerInput) ||
    item.email.toLowerCase().includes(lowerInput) ||
    item.body.toLowerCase().includes(lowerInput) ||
    item.postId.toString().includes(lowerInput) 
  );

  setFiltered(filteredData);
};




  return(
    <div>
        <div>
          <div className="bg-container" >      
                <button type="button" className="btn" onClick={()=>navigate("/Profile")} >Go To Profile</button>

                <SearchBar onSearch={handleSearch} search={search} />
               
                <select value={pageSize} className="btn1" onChange={(e)=>setPageSize(Number(e.target.value))}>
                          <option value={10}>10</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                </select>
            </div>

        <DashboardTable
            data={filtered}
            findSearch = {search}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            currentPage={currentPage}
            pageSize={pageSize}
        />

        <Pagination
          
            total={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
        />

        </div>

    </div>
  )

}

export default Dashboard