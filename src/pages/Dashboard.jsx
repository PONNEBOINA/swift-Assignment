import { useState,useEffect } from "react";
import DashboardTable from "../components/DashboardTable"
import Pagination from "../components/Pagination"
import SearchBar from "../components/SearchBar"
import { saveToStorage,loadFromStorage } from "../utils/storage";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router";

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

  const handleSearch = (input)=> {
    setSearch(input)
    const lowerInput = input.toLowerCase()
    setFiltered(comments.filter(item=>
        item.name.toLowerCase().includes(lowerInput) || 
        item.email.toLowerCase().includes(lowerInput)
    ))

  }




  return(
    <div>

        <div>
          <div style={{display:"flex",justifyContent:"space-between",paddingLeft:"30px" ,margin:"20px 20px"}}>      
                <button type="button" style={{backgroundColor:'blueviolet',color:"white"}} onClick={()=>navigate("/Profile")} >Go To Profile</button>

                <SearchBar onSearch={handleSearch} search={search} />
               



                <select value={pageSize} style={{backgroundColor:"#8b5cf6",color: "white",border: "none",cursor:"pointer"}} onChange={(e)=>setPageSize(Number(e.target.value))}>
                          <option value={10}>10</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                </select>
            </div>

        <DashboardTable
            data={filtered}
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