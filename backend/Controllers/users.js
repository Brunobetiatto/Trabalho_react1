import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM usuarios"; 
    db.query(q, (err, data) => {
        if (err) return res.json(err); 
        return res.status(200).json(data);
    }); 
};

export const searchUsers = (req, res) => {
    const { nome } = req.query;
    
    if (!nome) {
        return res.status(400).json({ error: "O parâmetro 'nome' é obrigatório." });
    }

    const query = "SELECT * FROM usuarios WHERE nome LIKE ?";
    
    db.query(query, [`%${nome}%`], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
};

export const addUser = (req, res) => {
    const { nome, sobrenome, cpf, pais, cidade } = req.body;
    
    // Verifica se o CPF é válido
    if (!validarCPF(cpf)) {
        return res.status(400).json({ error: "CPF inválido" });
    }

    const q = "INSERT INTO usuarios (nome, sobrenome, cpf, pais, cidade) VALUES (?, ?, ?, ?, ?)";
    
    db.query(q, [nome, sobrenome, cpf, pais, cidade], (err, result) => {
        if (err) {
            // Verifica se o erro é de CPF duplicado (ajuste conforme seu banco de dados)
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: "CPF já cadastrado" });
            }
            return res.status(500).json(err);
        }
        return res.status(201).json({ message: "Item adicionado com sucesso!" });
    });
};

export const deleteUser = (req, res) => {
    const userId = req.params.id;
    const q = "DELETE FROM usuarios WHERE id = ?";
    
    db.query(q, [userId], (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json({ message: "Item deletado com sucesso!" });
    });
};

export const updateUser = (req, res) => {
    const userId = req.params.id;
    const { nome, sobrenome, cpf, pais, cidade} = req.body;

    // Verifica se o CPF é válido
    if (!validarCPF(cpf)) {
        return res.status(400).json({ error: "CPF inválido" });
    }

    const q = "UPDATE usuarios SET nome = ?, sobrenome = ?, cpf = ?, pais = ?, cidade = ? WHERE id = ?";

    db.query(q, [nome, sobrenome, cpf, pais, cidade, userId], (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json({ message: "Item atualizado com sucesso!" });
    });
};


export const getUserById = (req, res) => {
    const userId = req.params.id;
    const q = "SELECT * FROM usuarios WHERE id = ?";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json({ error: "Usuário não encontrado" });
        return res.status(200).json(data[0]);
    });
};



// Função para validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    
    // Verifica se tem 11 dígitos ou se é uma sequência de dígitos iguais
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
  
    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;
  
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
      return false;
    }
  
    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;
  
    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
      return false;
    }
  
    return true;
  }
