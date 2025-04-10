import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/App.css";

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const navigate = useNavigate();

  const IMAGENS_POR_NOME = {
    'default': '/imagens/R.jpg',
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getImagemUsuario = (nome, imagemCustomizada) => {
    if (imagemCustomizada) {
      return `/imagens/${imagemCustomizada}`;
    }
    return IMAGENS_POR_NOME[nome.toLowerCase()] || IMAGENS_POR_NOME['default'];
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:8800/")
      .then((response) => response.json())
      .then((data) => {
        const usersWithImages = data.map(user => ({
          ...user,
          imagem: user.imagem || null
        }));
        setUsers(usersWithImages);
        setCurrentPage(1);
      })
      .catch((error) => console.error("Erro ao buscar usuários:", error));
  };

  const deleteUser = (id) => {
    fetch(`http://localhost:8800/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
        if (currentItems.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      })
      .catch((error) => console.error("Erro ao deletar usuário:", error));
  };

  const handleMouseMove = (e, id) => {
    const card = document.getElementById(`user-card-${id}`);
    if (card) {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 20;
      const y = (e.clientY - top - height / 2) / 20;
      card.style.setProperty('--x', `${x}deg`);
      card.style.setProperty('--y', `${-y}deg`);
      card.style.transform = `scale(1.05) rotateY(var(--x)) rotateX(var(--y))`;
    }
  };

  const handleMouseLeave = (id) => {
    const card = document.getElementById(`user-card-${id}`);
    if (card) {
      card.style.transform = "scale(1) rotateY(0deg) rotateX(0deg)";
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          <h2>Bruno Betiatto Alves</h2>
          <button className="add-user-btn" onClick={() => navigate("/adicionar")}>
            + Adicionar Usuário
          </button>
        </div>

        <div className="user-list">
          {currentItems.map((user) => (
            <div
              key={user.id}
              id={`user-card-${user.id}`}
              className="user-card"
              onClick={() => navigate(`/usuario/${user.id}`)}
              onMouseMove={(e) => handleMouseMove(e, user.id)}
              onMouseLeave={() => handleMouseLeave(user.id)}
              style={{
                backgroundImage: `url(${getImagemUsuario(user.nome, user.imagem)})`
              }}
            >
              <h3>{user.nome}</h3>
              <div className="user-actions">
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteUser(user.id);
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {users.length > itemsPerPage && (
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="page-btn"
            >
              Anterior
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`page-btn ${currentPage === number ? 'active' : ''}`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="page-btn"
            >
              Próxima
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default UserListPage;
