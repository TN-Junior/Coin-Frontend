import React, { useState } from "react";
import axios from "axios";
import "./login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/User/login', { email, password });
      if (response.data) {
        // Sucesso no login, redirecionar ou armazenar informações do usuário
        console.log('Login bem-sucedido:', response.data);
      } else {
        setError('Email ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao fazer login, tente novamente mais tarde.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="coin-title">COIN</div>
        <div className="login-box">
          <form onSubmit={handleLogin}>
            <div>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="forgot-password">
              <a href="/forgot-password" className="forgot-password-link">Esqueci a senha</a>
            </div>
            <button type="submit">Entrar</button>
          </form>
        </div>
        <div className="signup-link">
          Ainda não é colaborador? <a href="/cadastro">Cadastre-se agora</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
