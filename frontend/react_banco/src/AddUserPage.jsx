// src/AddUserPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUserPage() {
  const [newUser, setNewUser] = useState({
    nome: "", sobrenome: "", cpf: "", pais: "", cidade: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'imagem') {
      setSelectedFile(e.target.files[0]);
    } else {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
  };

  const addUser = async () => {
    setIsLoading(true);
    setShowError(false);
    setShowSuccess(false);
    
    try {
      // Verificação básica dos campos obrigatórios
      if (!newUser.nome || !newUser.sobrenome || !newUser.cpf) {
        throw new Error("Preencha todos os campos obrigatórios");
      }

      let imagemNome = null;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("imagem", selectedFile);

        const uploadRes = await fetch("http://localhost:8800/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("Erro no upload da imagem");

        const uploadData = await uploadRes.json();
        imagemNome = uploadData.filename;
      }

      const res = await fetch("http://localhost:8800/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newUser, imagem: imagemNome }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        // Trata erros específicos do backend
        if (data.error === "CPF inválido") {
          throw new Error("O CPF informado não é válido");
        } else if (data.error === "CPF já cadastrado") {
          throw new Error("Este CPF já está cadastrado");
        } else {
          throw new Error("Erro ao adicionar usuário");
        }
      }

      setShowSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Erro:", err);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-popup">
      <div className="add-popup-content">
        <h3>Adicionar Usuário</h3>
        
        {showError && (
          <div className="error-message">
            Ocorreu um erro. Por favor, tente novamente.
          </div>
        )}
        
        {showSuccess && (
          <div className="success-message">
            Usuário adicionado com sucesso!
          </div>
        )}
        
        <input 
          type="text" 
          name="nome" 
          value={newUser.nome} 
          onChange={handleChange} 
          placeholder="Nome*" 
          required
        />
        <input 
          type="text" 
          name="sobrenome" 
          value={newUser.sobrenome} 
          onChange={handleChange} 
          placeholder="Sobrenome*" 
          required
        />
        <input 
          type="text" 
          name="cpf" 
          value={newUser.cpf} 
          onChange={handleChange} 
          placeholder="CPF*" 
          required
        />
        <input 
          type="text" 
          name="pais" 
          value={newUser.pais} 
          onChange={handleChange} 
          placeholder="País" 
        />
        <input 
          type="text" 
          name="cidade" 
          value={newUser.cidade} 
          onChange={handleChange} 
          placeholder="Cidade" 
        />
        
        <button 
          className="save-btn" 
          onClick={addUser}
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : 'Salvar'}
        </button>
        
        <button 
          className="close-btn" 
          onClick={() => navigate("/")}
          disabled={isLoading}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default AddUserPage;