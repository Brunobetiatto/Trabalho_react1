import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserListPage from "./UserListPage";
import UserDetailPage from "./UserDetailPage";
import UserEditPage from "./UserEditPage";
import AddUserPage from "./AddUserPage"; // já criado

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/adicionar" element={<AddUserPage />} />
        <Route path="/usuario/:id" element={<UserDetailPage />} />
        <Route path="/usuario/:id/editar" element={<UserEditPage />} />
      </Routes>
    </Router>
  );
}

export default App;
