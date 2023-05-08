import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

export default function PendingReports() {
  const [amostras, setAmostras] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const BACK_END_URL = process.env.REACT_APP_BACK_END_URL;

   async function fetchAmostras() {
     try {
       const response = await axios.get(`${BACK_END_URL}/amostras`);
       setClients(response.data);
     } catch (error) {
       console.log(error);
     }
   }

  useEffect(() => {
    fetchAmostras();
  }, []);

  async function handleDelete(id) {
    try {
      await axios.delete(`${BACK_END_URL}/amostras/${id}`);
      setShowModal(false);
      setSelectedClient(null);
      // Atualiza o estado das amostras removendo a amostra excluída
      const updatedAmostras = amostras.filter((amostra) => amostra.id !== id);
      setAmostras(updatedAmostras);
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

  useEffect(() => {
    async function fetchData() {
      try {
        const [amostrasResponse, clientesResponse] = await Promise.all([
          axios.get(`${BACK_END_URL}/amostras`),
          axios.get(`${BACK_END_URL}/clientes`),
        ]);
        setAmostras(amostrasResponse.data);
        setClientes(clientesResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleFiltro = (event) => {
    const valorSelecionado = event.target.value;
    setClienteSelecionado(
      valorSelecionado === "" ? null : parseInt(valorSelecionado)
    );
  };

  let amostrasFiltradas;

  if (clienteSelecionado === null) {
    amostrasFiltradas = amostras;
  } else {
    amostrasFiltradas = amostras.filter((amostra) => {
      return amostra.cliente_id === parseInt(clienteSelecionado);
    });
  }

  const optionsClientes = clientes.map((cliente) => (
    <option key={cliente.id} value={cliente.id}>
      {cliente.name}
    </option>
  ));

  return (
    <>
      <Filtro>
        <label>
          Filtrar por clientes:
          <select value={clienteSelecionado} onChange={handleFiltro}>
            <option value="">Todos os clientes</option>
            {optionsClientes}
          </select>
        </label>
      </Filtro>

      {amostrasFiltradas.length > 0 ? (
        amostrasFiltradas
          .slice()
          .reverse()
          .map((amostra) => {
            const cliente = clientes.find((c) => c.id === amostra.cliente_id);
            return (
              <Container key={amostra.id}>
                <DadosDoClienteBox>
                  <Title>
                    <h1>Dados do cliente</h1>
                  </Title>
                  <DadosDoClienteGrid>
                    <p>Nome: {cliente ? cliente.name : ""}</p>
                    <p>CPF: {amostra.cliente?.cpf}</p>
                    <p>IE: {amostra.cliente?.ie}</p>
                    <p>E-mail: {amostra.cliente?.email}</p>
                    <p>Telefone: {amostra.cliente?.telefone}</p>
                    <p>Endereço: {amostra.cliente?.endereco}</p>
                  </DadosDoClienteGrid>
                </DadosDoClienteBox>
                <DadosDaAmostraBox>
                  <Title>
                    <h1>Dados da Amostra</h1>
                  </Title>
                  <DadosDoClienteGrid>
                    <p>Fazenda: {amostra.fazenda}</p>
                    <p>Quem coletou: {amostra.quemColetou}</p>
                    <p>Entrada no laboratório: {amostra.entradaNoLab}</p>
                    <p>Município: {amostra.municipio}</p>
                    <p>Estado: {amostra.estado}</p>
                    <p>Entregue por: {amostra.entreguePor}</p>
                    <p>Ocorrências: {amostra.Ocorrencias}</p>
                    <p>Temperatura: {amostra.temperatura}</p>
                  </DadosDoClienteGrid>
                </DadosDaAmostraBox>

                {amostra.identAmostra.map((ident) => (
                  <DadosDaAmostraBox key={ident.id}>
                    <Title>
                      <h1>Identificação da amostra</h1>
                    </Title>
                    <DadosDoClienteGrid>
                      <p>Código: {ident.codigo}</p>
                      <p>Fabricação: {ident.fabricacao}</p>
                      <p>Vencimento: {ident.vencimento}</p>
                      <p>Microorganismo: {ident.microorganismo}</p>
                      <p>Produto/Cultura: {ident.produtocultura}</p>
                      <p>Valor da amostra: {ident.preco}</p>
                    </DadosDoClienteGrid>
                  </DadosDaAmostraBox>
                ))}
                <DadosDaAmostraBox>
                  <Title>
                    <h1>Parâmetros</h1>
                  </Title>
                  <DadosDoClienteGrid>
                    <p>Comercial: {amostra.comercial ? "Sim" : "Não"}</p>
                    <p>OnFarm: {amostra.onFarm ? "Sim" : "Não"}</p>
                    <p>
                      Viabilidade em água:{" "}
                      {amostra.viabilidadeEmAgua ? "Sim" : "Não"}
                    </p>
                    <p>
                      Contagem de conídeos:{" "}
                      {amostra.contagemDeConidios ? "Sim" : "Não"}
                    </p>
                    <p>Água: {amostra.agua ? "Sim" : "Não"}</p>
                    <p>pH: {amostra.ph ? "Sim" : "Não"}</p>
                    <p>Solo: {amostra.solo ? "Sim" : "Não"}</p>
                  </DadosDoClienteGrid>
                </DadosDaAmostraBox>
                <AdminOptions>
                  <p onClick={() => openModal(amostra)}>Excluir Amostra</p>
                </AdminOptions>
                {showModal && (
                  <ModalContainer>
                    <ModalBox>
                      <h2>Tem certeza que deseja excluir essa amostra?</h2>
                      <div>
                        <Button onClick={() => handleDelete(selectedClient.id)}>
                          Sim
                        </Button>
                        <Button onClick={() => closeModal()}>Não</Button>
                      </div>
                    </ModalBox>
                  </ModalContainer>
                )}
              </Container>
            );
          })
      ) : (
        <p>Nenhuma amostra correspondente.</p>
      )}
    </>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #283739;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  background-color: #228896;
  padding: 5px;
  border-radius: 5px;

  h1 {
    font-weight: 700;
  }
`;

export const DadosDoClienteGrid = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 10px;

  p {
    margin: 0;
    font-size: 15px;
  }
`;

export const DadosDoClienteBox = styled.div`
  margin-top: 20px;
  width: 800px;
  height: fit-content;
  background-color: lightgray;
  padding: 10px;
`;

export const DadosDaAmostraBox = styled.div`
  width: 800px;
  height: fit-content;
  background-color: lightgray;
  padding: 10px;
`;

const Filtro = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

const AdminOptions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2%;
  cursor: pointer;

  p {
    background-color: red;
    padding: 10px;
    border-radius: 5px;
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
