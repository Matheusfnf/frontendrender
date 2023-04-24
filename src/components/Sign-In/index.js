import { useState } from "react";
import styled from "styled-components";
import logoProativa from "../../images/ProativaBio.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const BACK_END_URL = process.env.REACT_APP_BACK_END_URL;

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BACK_END_URL}/auth/sign-in`, {
        email,
        password,
      });
      console.log(response);
      localStorage.setItem("token", response.data.token);
      // Faz algo com a resposta do servidor, se necessário
      // Redireciona o usuário para a página /clients
      navigate("/clients");
    } catch (error) {
      // Exibe uma mensagem de erro usando a biblioteca react-toastify
      setHasError(true);
      toast.error("Erro ao fazer login");
    }
  };

  return (
    <>
      <SigninContainer>
        <Logo src={logoProativa} alt="Logo do site" />
        <InputContainer>
          <InputLabel>Email</InputLabel>
          <Input
            type="email"
            placeholder="Insira seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>Senha</InputLabel>
          <Input
            type="password"
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>
        <LoginButton onClick={handleLogin}>Entrar</LoginButton>
        {hasError && (
          <ErrorMessage>
            Ocorreu um erro ao fazer login. Por favor, tente novamente.
          </ErrorMessage>
        )}
      </SigninContainer>
    </>
  );
}
const SigninContainer = styled.div`
  width: 35%;
  min-width: 350px;
  max-width: 500px;
  height: 500px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.img`
  margin-bottom: 10px;
  width: 40%;
  height: 40%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  width: 80%;
`;

const InputLabel = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  color: #333;
  margin-top: 5px;
  margin-bottom: 15px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
  }
`;

const LoginButton = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #0062cc;
  }
`;

const ForgotPasswordLink = styled.a`
  margin-top: 20px;
  color: #555;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;
