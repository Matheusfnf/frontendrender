import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

export default function AllClients() {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const BACK_END_URL = process.env.REACT_APP_BACK_END_URL;

  async function fetchClients() {
    try {
      const response = await axios.get(`${BACK_END_URL}/clientes`);
      setClients(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

  async function handleDelete(id) {
    try {
      await axios.delete(`${BACK_END_URL}/clientes/${id}`);
      setShowModal(false);
      setSelectedClient(null);
      fetchClients();
    } catch (error) {
      console.log(error);
    }
  }

  function openModal(client) {
    setSelectedClient(client);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setSelectedClient(null);
  }

  return (
    <>
      <AllClientsContainer>
        <h1>Clientes</h1>

        {clients.map((client) => (
          <ClientBox key={client.id}>
            <div>
              <h2>{client.name}</h2>
              <h3>CPF/CNPJ: {client.cpf}</h3>
              <h3>IE: {client.ie}</h3>
              <h3>Email: {client.email}</h3>
              <h3>Telefone: {client.telefone}</h3>
              <h3>Endereço: {client.endereco}</h3>
            </div>
            <div>
              <FaTrashAlt
                size={15}
                style={{ margin: "40px 0 0 0" }}
                onClick={() => openModal(client)}
              />
            </div>
          </ClientBox>
        ))}

        {showModal && (
          <ModalContainer>
            <ModalBox>
              <h2>Tem certeza que deseja excluir esse cliente?</h2>
              <div>
                <Button onClick={() => handleDelete(selectedClient.id)}>
                  Sim
                </Button>
                <Button onClick={() => closeModal()}>Não</Button>
              </div>
            </ModalBox>
          </ModalContainer>
        )}
      </AllClientsContainer>
    </>
  );
}
//Styled components

const ClientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
`;

const ClientBox = styled.div`
  margin-top: 30px;
  width: 200%;
  height: 30vh;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  position: relative;
  border: 5px solid #228896;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

  div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  div:last-child {
    position: absolute;
    top: 10px;
    right: 10px;
    transform: translate(-50%, -50%);
  }

  h2 {
    font-weight: 700;
    font-size: 24px;
    margin-left: 20px;
    color: #4f4f4f;
  }

  h3 {
    font-size: 18px;
    margin-left: 20px;
    margin-top: 12px;
    color: #828282;
  }
`;

const AllClientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  h1 {
    font-size: 36px;
    color: #0d4c8b;
    margin-bottom: 20px;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled.div`
  width: 300px;
  height: 100px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
    color: #4f4f4f;
  }

  div {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
`;

const Button = styled.button`
  background-color: #0d4c8b;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #003366;
  }
`;
