import { Route,Routes,BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"

const App = ()=>{
  return(
    <Router>
      <Routes>

         <Route path="/" element={<Dashboard/>} />
        <Route path="/Profile" element={<Profile/>} />
       
      </Routes>
    </Router>
  )
}

export default App