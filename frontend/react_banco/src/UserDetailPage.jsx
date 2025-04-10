import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './style/UserDetailPage.css';

function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8800/${id}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error("Erro ao carregar detalhes:", err));
  }, [id]);

  if (!user) return <p>Carregando...</p>;

  return (
    <div className="user-detail-page">
      <button onClick={() => navigate("/")}>← Voltar para lista</button>
      <h2>{user.nome} {user.sobrenome}</h2>
      <p><strong>CPF:</strong> {user.cpf}</p>
      <p><strong>País:</strong> {user.pais}</p>
      <p><strong>Cidade:</strong> {user.cidade}</p>
      <button onClick={() => navigate(`/usuario/${id}/editar`)}>Editar Usuário</button>
    </div>
  );
}

export default UserDetailPage;
