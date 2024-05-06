import { Route, Routes } from "react-router"
import UserTable from "./pages/Usertable"
import { Login } from "./pages/Login";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserTable />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App