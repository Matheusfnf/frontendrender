import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputMask from "react-input-mask";

export default function Clients() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [ie, setIe] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const BACK_END_URL = process.env.REACT_APP_BACK_END_URL;

  const isValidCpf = (cpf) => {
    return /^\d{8,15}$/.test(cpf);
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidIe = (ie) => {
    return /^\d+$/.test(ie);
  };

  const isValidPhone = (phone) => {
    return /^\d+$/.test(phone);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const payload = {
      name: formData.get("name"),
      cpf: formData.get("cpf"),
      ie: formData.get("ie"),
      email: formData.get("email"),
      telefone: formData.get("phone"),
      endereco: formData.get("address"),
    };

    if (!isValidCpf(payload.cpf)) {
      toast.error(
        "CPF inválido. O CPF deve ter entre 8 a 15 dígitos numéricos."
      );
      return;
    }

    if (!isValidEmail(payload.email)) {
      toast.error("E-mail inválido.");
      return;
    }

    if (!isValidIe(payload.ie)) {
      toast.error("IE inválido. A IE deve ser um número.");
      return;
    }

    if (!isValidPhone(payload.telefone)) {
      toast.error("Telefone inválido. O telefone deve ter somente números.");
      return;
    }

    try {
      const response = await axios.post(`${BACK_END_URL}/clientes`, payload);

      // se o servidor responder com status 200, exibe o Toastify de sucesso
      if (response.status === 200) {
        toast.success("Cliente cadastrado com sucesso!");
      } else {
        toast.error("Erro ao cadastrar cliente.");
      }

      console.log(response);
    } catch (error) {
      console.error(error);

      // se houver um erro na requisição, exibe o Toastify de erro
      toast.error("Erro ao cadastrar cliente.");
    }
  };

  return (
    <>
      <Container>
        <h1>Cadastrar cliente</h1>
        <Form onSubmit={handleSubmit}>
          <Grid>
            <Label htmlFor="name" row="1">
              Nome:
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              row="1"
            />

            <Label htmlFor="cpf" row="2">
              CPF:
            </Label>
            <StyledInputMask
              type="text"
              id="cpf"
              name="cpf"
              value={cpf}
              onChange={(event) => setCpf(event.target.value)}
              row="2"
            />

            <Label htmlFor="ie" row="3">
              IE:
            </Label>
            <Input
              type="text"
              id="ie"
              name="ie"
              value={ie}
              onChange={(event) => setIe(event.target.value)}
              row="3"
            />

            <Label htmlFor="email" row="1">
              E-mail:
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              row="1"
            />

            <Label htmlFor="phone" row="2">
              Telefone:
            </Label>
            <StyledInputMask
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              row="2"
            />

            <Label htmlFor="address" row="3">
              Endereço:
            </Label>
            <Input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              row="3"
            />
          </Grid>
          <Button type="submit">Salvar</Button>
        </Form>
      </Container>
    </>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;
  background-color: #fff;
  padding: 60px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  max-width: 1000px;
  height: 60%;
  h1 {
    font-size: 30px;
    color: #228896;
    margin-bottom: 20px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const Label = styled.label`
  font-size: 16px;
  color: #228896;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  color: #333;
`;

export const Button = styled.button`
  margin-top: auto;
  width: 200px;
  padding: 10px;
  background-color: #228896;
  color: #fff;
  font-size: 16px;

  &:hover {
    cursor: pointer;
    background-color: #283739;
  }
`;

const StyledInputMask = styled(InputMask)`
  padding: 15px;
  padding-right: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  color: #333;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, auto);
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  margin-bottom: 20px;
`;
