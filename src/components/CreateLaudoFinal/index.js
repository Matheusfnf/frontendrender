import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import styled from "styled-components";
import { saveAs } from "file-saver";

export default function CreateLaudoFinal() {
  const [amostras, setAmostras] = useState([]);
  const [editedValues, setEditedValues] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]);

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

  async function generatePDF(amostraId) {
    try {
      const response = await axios.get(
        `${BACK_END_URL}/amostras/pdf/${amostraId}`,
        {
          responseType: "blob",
        }
      );

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      saveAs(pdfBlob, `Amostra-${amostraId}.pdf`);
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao gerar o PDF.");
    }
  }

  function OptionWithExponent({ base, exponent }) {
    const value = `${base}e${exponent}`;
    const label = (
      <span>
        {base}x10<sup>{exponent}</sup>
      </span>
    );
    return <option value={value}>{label}</option>;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const amostrasResponse = await axios.get(`${BACK_END_URL}/amostras`);
        setAmostras(amostrasResponse.data);

        const initialEditedValues = {};
        amostrasResponse.data.forEach((amostra) => {
          amostra.identAmostra.forEach((ident) => {
            initialEditedValues[`${amostra.id}_${ident.id}`] = {
              ufcmicroorganismo: ident.ufcmicroorganismo,
              ufccoliformes: ident.ufccoliformes,
              ufcbolor: ident.ufcbolor,
            };
          });
        });
        setEditedValues(initialEditedValues);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  async function handleEdit(identId, amostraId, field, value) {
    if (isNaN(identId) || identId === null || identId === undefined) {
      throw new Error(`IdentId '${identId}' is not a valid number`);
    }

    try {
      await axios.put(`${BACK_END_URL}/tipoamostra/${amostraId}/${identId}`, {
        [field]: value,
      });

      setAmostras((prevAmostras) => {
        const updatedAmostras = [...prevAmostras];
        const amostraIndex = updatedAmostras.findIndex(
          (amostra) => amostra.id === amostraId
        );
        if (amostraIndex >= 0) {
          const identIndex = updatedAmostras[
            amostraIndex
          ].identAmostra.findIndex((ident) => ident.id === identId);
          if (identIndex >= 0) {
            updatedAmostras[amostraIndex].identAmostra[identIndex][field] =
              value;
          }
        }
        return updatedAmostras;
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const amostrasResponse = await axios.get(`${BACK_END_URL}/amostras`);
        setAmostras(amostrasResponse.data);

        const initialEditedValues = {};
        amostrasResponse.data.forEach((amostra) => {
          amostra.identAmostra.forEach((ident) => {
            if (!isNaN(ident.id)) {
              initialEditedValues[`${amostra.id}_${ident.id}`] = {
                ufcmicroorganismo: ident.ufcmicroorganismo,
                ufccoliformes: ident.ufccoliformes,
                ufcbolor: ident.ufcbolor,
              };
            }
          });
        });
        setEditedValues(initialEditedValues);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch data from server");
      }
    }
    fetchData();
  }, []);

  function handleInputChange(event, amostraId, identId, field) {
    setEditedValues({
      ...editedValues,
      [`${amostraId}_${identId}`]: {
        ...editedValues[`${amostraId}_${identId}`],
        [field]: event.target.value,
      },
    });

    handleEdit(identId, amostraId, field, event.target.value);
  }
  return (
    <>
      <Titulo>
        <h1>Inserir Resultados Finais</h1>
      </Titulo>

      {amostras.map((amostra) => (
        <TodosOsDadosBox key={amostra.id}>
          <Title>
            <h1>Informações cadastrais</h1>
          </Title>
          <DadosDoClienteGrid>
            <p>Solicitante: {amostra.entreguePor}</p>
            <p>Propriedade: {amostra.fazenda}</p>
            <p>Data da coleta: {amostra.datadaColeta}</p>
            <p>Entregue por: {amostra.entreguePor}</p>
            <p>Matriz analítica: cultura liquida on farm</p>
            <p>Proprietário: {amostra?.cliente.name}</p>
            <p>Entrada no laboratório: {amostra.entradaNoLab}</p>
            <p>Município: {amostra.municipio}</p>
            <p>Estado: {amostra.estado}</p>
            <p>Temperatura: {amostra?.temperatura}</p>
          </DadosDoClienteGrid>

          <Title>
            <h1>Apresentação dos resultados</h1>
          </Title>
          {amostra.identAmostra.map((ident) => (
            <DadosDaAmostraBox key={ident.id}>
              <Separador />
              <DadosDosResultados>
                <label>
                  <h1>Código:</h1>
                  <p>{ident.codigo}</p>
                </label>

                <label>
                  <h1>Amostra OnFarm: </h1>
                  <p>{ident.microorganismo}</p>
                </label>

                <label>
                  <h1>Produto Comercial:</h1>
                  <p>{ident.produtocultura}</p>
                </label>

                <label>
                  <h1>(UFC/ML) Amostra OnFarm</h1>
                  <p>
                    {editedValues[`${amostra.id}_${ident.id}`] ? (
                      <SelectBolor
                        name="ufcmicroorganismo"
                        value={
                          editedValues[`${amostra.id}_${ident.id}`]
                            ?.ufcmicroorganismo ?? ""
                        }
                        onChange={(event) =>
                          handleInputChange(
                            event,
                            amostra.id,
                            ident.id,
                            "ufcmicroorganismo"
                          )
                        }
                        onBlur={() =>
                          handleEdit(
                            ident.id,
                            amostra.id,
                            "ufcmicroorganismo",
                            editedValues[`${amostra.id}_${ident.id}`]
                              ?.ufcmicroorganismo ?? ""
                          )
                        }
                        editedValues={editedValues}
                        amostra={amostra}
                        ident={ident}
                      >
                        <option value="">Selecione uma opção</option>
                        <option value="N.C.">N.C.</option>
                        {[...Array(10).keys()].map((i) =>
                          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((j) => (
                            <option key={`${i}${j}`} value={`${j}e${i}`}>
                              {`${j}x10^${i}`}
                            </option>
                          ))
                        )}
                      </SelectBolor>
                    ) : (
                      <span>
                        {ident.ufcmicroorganismo} :{" "}
                        <FaPen
                          onClick={() =>
                            setEditedValues({
                              ...editedValues,
                              [`${amostra.id}_${ident.id}`]: {
                                ...editedValues[`${amostra.id}_${ident.id}`],
                                ufcmicroorganismo: ident.ufcmicroorganismo,
                              },
                            })
                          }
                        />
                      </span>
                    )}
                  </p>
                </label>

                <label>
                  <h1>(UFC/ML) Coliformes</h1>
                  <p>
                    {editedValues[`${amostra.id}_${ident.id}`] ? (
                      <ColiformesSelect
                        name="ufccoliformes"
                        value={
                          editedValues[`${amostra.id}_${ident.id}`]
                            ?.ufccoliformes ?? ""
                        }
                        onChange={(event) =>
                          handleInputChange(
                            event,
                            amostra.id,
                            ident.id,
                            "ufccoliformes"
                          )
                        }
                        onBlur={() =>
                          handleEdit(
                            ident.id,
                            amostra.id,
                            "ufccoliformes",
                            editedValues[`${amostra.id}_${ident.id}`]
                              ?.ufccoliformes ?? ""
                          )
                        }
                        editedValues={editedValues}
                        amostra={amostra}
                        ident={ident}
                      >
                        <option value="">Selecione uma opção</option>
                        <option value="N.C.">N.C.</option>
                        {[...Array(10).keys()].map((i) =>
                          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((j) => (
                            <OptionWithExponent
                              key={`${j}e${i}`}
                              base={j}
                              exponent={i}
                            />
                          ))
                        )}
                      </ColiformesSelect>
                    ) : (
                      <span>
                        {ident.ufccoliformes} :{" "}
                        <FaPen
                          onClick={() =>
                            setEditedValues({
                              ...editedValues,
                              [`${amostra.id}_${ident.id}`]: {
                                ...editedValues[`${amostra.id}_${ident.id}`],
                                ufccoliformes: ident.ufccoliformes,
                              },
                            })
                          }
                        />
                      </span>
                    )}
                  </p>
                  <h3>Valores ideiais para coliformes:</h3>
                  <h4>
                    {" "}
                    Menor ou igual a 5x10<sup>2</sup>
                  </h4>
                </label>
                <label>
                  <h1>(UFC/ML) Bolor/Levedura</h1>
                  <p>
                    {editedValues[`${amostra.id}_${ident.id}`] ? (
                      <SelectBolor
                        name="ufcbolor"
                        value={
                          editedValues[`${amostra.id}_${ident.id}`]?.ufcbolor ??
                          ""
                        }
                        onChange={(event) =>
                          handleInputChange(
                            event,
                            amostra.id,
                            ident.id,
                            "ufcbolor"
                          )
                        }
                        onBlur={() =>
                          handleEdit(
                            ident.id,
                            amostra.id,
                            "ufcbolor",
                            editedValues[`${amostra.id}_${ident.id}`]
                              ?.ufcbolor ?? ""
                          )
                        }
                        editedValues={editedValues}
                        amostra={amostra}
                        ident={ident}
                      >
                        <option value="">Selecione uma opção</option>
                        <option value="N.C.">N.C.</option>
                        {[...Array(10).keys()].map((i) =>
                          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((j) => (
                            <option key={`${i}${j}`} value={`${j}e${i}`}>
                              {`${j}x10`}
                              <sup>{`${i}`}</sup>
                            </option>
                          ))
                        )}
                      </SelectBolor>
                    ) : (
                      <span>
                        {ident.ufcbolor} :{" "}
                        <FaPen
                          onClick={() =>
                            setEditedValues({
                              ...editedValues,
                              [`${amostra.id}_${ident.id}`]: {
                                ...editedValues[`${amostra.id}_${ident.id}`],
                                ufcbolor: ident.ufcbolor,
                              },
                            })
                          }
                        />
                      </span>
                    )}
                  </p>
                  <h3>Valores ideais para Bolor/Levedura:</h3>
                  <h4>
                    Menor que 1x10<sup>0</sup>
                  </h4>
                </label>
                <AdminOptions>
                  <AdminOptions>
                    <Imprimir onClick={() => generatePDF(amostra.id)}>
                      IMPRIMIR
                    </Imprimir>
                    <DeletarAmostra onClick={() => openModal(amostra)}>Deletar Amostra</DeletarAmostra>
                  </AdminOptions>
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
              </DadosDosResultados>
            </DadosDaAmostraBox>
          ))}
        </TodosOsDadosBox>
      ))}
    </>
  );
}

// Styled components

const Titulo = styled.div`
  width: 100%;
  h1 {
    font-size: 20px;
    margin-top: 20px;
    color: blue;
    margin-bottom: 20px;
  }
`;

const DadosDoClienteGrid = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 10px;

  p {
    margin: 0;
    font-size: 15px;
  }
`;

const DadosDosResultados = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 10px;

  p {
    font-size: 15px;
  }

  h1 {
    margin-top: 10px;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 5px;
  }

  h3 {
    margin-top: 10px;
    color: darkblue;
    font-weight: 700;
  }
`;

const TodosOsDadosBox = styled.div`
  margin-top: 20px;
  width: 100%;
  height: fit-content;
  background-color: lightgray;
  padding: 10px;
  border: 15px solid #283739;
`;

const DadosDaAmostraBox = styled.div`
  width: 100%;
  height: fit-content;
  background-color: lightgray;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  background-color: #228896;
  padding: 5px;
  border-radius: 5px;
  width: 100%;

  h1 {
    font-weight: 700;
  }
`;

const Container = styled.div`
  border: 5px solid gray;
`;

const Separador = styled.div`
  width: 100%;
  height: 2px;
  background-color: gray;
  margin-top: 30px;
`;

const SelectDanger = styled.select`
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
`;

const SelectSuccess = styled.select`
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
`;

const ColiformesSelect = styled.select`
  ${({ editedValues, amostra, ident }) =>
    editedValues[`${amostra.id}_${ident.id}`]?.ufccoliformes <= 5e2
      ? SelectDanger
      : SelectSuccess};
  font-size: 15px;
  width: 100%;
  padding: 5px;
  border-radius: 5px;
`;

const SelectBolor = styled.select`
  ${({ editedValues, amostra, ident }) =>
    editedValues[`${amostra.id}_${ident.id}`]?.ufccoliformes <= 5e2
      ? SelectDanger
      : SelectSuccess};
  font-size: 15px;
  width: 100%;
  padding: 5px;
  border-radius: 5px;
`;

const AdminOptions = styled.div`
  display: flex;

  margin-top: 2%;
`;

const Imprimir = styled.p`
  /* Aqui você pode definir os estilos desejados para o elemento "p" com a cor vermelha */
  background-color: gray;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
`;

const DeletarAmostra = styled.p`
  /* Aqui você pode definir os estilos desejados para o elemento "p" com a cor azul */
  background-color: red;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
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
