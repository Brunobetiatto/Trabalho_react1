import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './style/UserEditPage.css';

function UserEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    nome: "", 
    sobrenome: "", 
    cpf: "", 
    pais: "", 
    cidade: "" 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [originalCpf, setOriginalCpf] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8800/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Erro ao carregar usuário");
        return res.json();
      })
      .then(data => {
        setFormData(data);
        setOriginalCpf(data.cpf); // Guarda o CPF original para comparação
      })
      .catch(err => {
        console.error("Erro ao carregar usuário:", err);
        setShowError(true);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    setShowError(false);
    setShowSuccess(false);

    try {
      // Verifica campos obrigatórios
      if (!formData.nome || !formData.sobrenome || !formData.cpf) {
        throw new Error("Preencha todos os campos obrigatórios");
      }

      // Só valida o CPF se ele foi alterado
      if (formData.cpf !== originalCpf) {
        const cpfResponse = await fetch(`http://localhost:8800/check-cpf?cpf=${formData.cpf}`);
        const cpfData = await cpfResponse.json();
        
        if (cpfData.error === "CPF inválido") {
          throw new Error("O CPF informado não é válido");
        } else if (cpfData.error === "CPF já cadastrado") {
          throw new Error("Este CPF já está cadastrado");
        }
      }

      const response = await fetch(`http://localhost:8800/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "CPF inválido") {
          throw new Error("O CPF informado não é válido");
        } else if (data.error === "CPF já cadastrado") {
          throw new Error("Este CPF já está cadastrado");
        } else {
          throw new Error("Erro ao salvar alterações");
        }
      }

      setShowSuccess(true);
      setTimeout(() => {
        navigate(`/usuario/${id}`);
      }, 1500);
    } catch (err) {
      console.error("Erro ao salvar:", err);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-edit-page">
      <button 
        onClick={() => navigate(`/usuario/${id}`)}
        disabled={isLoading}
      >
        ← Voltar
      </button>
      
      <h2>Editar Usuário</h2>
      
      {showError && (
        <div className="error-message">
          Ocorreu um erro ao salvar. Verifique os dados e tente novamente.
        </div>
      )}
      
      {showSuccess && (
        <div className="success-message">
          Alterações salvas com sucesso!
        </div>
      )}
      
      <input 
        name="nome" 
        value={formData.nome} 
        onChange={handleChange} 
        placeholder="Nome*" 
        disabled={isLoading}
        required
      />
      <input 
        name="sobrenome" 
        value={formData.sobrenome} 
        onChange={handleChange} 
        placeholder="Sobrenome*" 
        disabled={isLoading}
        required
      />
      <input 
        name="cpf" 
        value={formData.cpf} 
        onChange={handleChange} 
        placeholder="CPF*" 
        disabled={isLoading}
        required
      />
      <input 
        name="pais" 
        value={formData.pais} 
        onChange={handleChange} 
        placeholder="País" 
        disabled={isLoading}
      />
      <input 
        name="cidade" 
        value={formData.cidade} 
        onChange={handleChange} 
        placeholder="Cidade" 
        disabled={isLoading}
      />
      
      <button 
        onClick={handleSave}
        disabled={isLoading}
      >
        {isLoading ? 'Salvando...' : 'Salvar Alterações'}
      </button>
    </div>
  );
}

export default UserEditPage;