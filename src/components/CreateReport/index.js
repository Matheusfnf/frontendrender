import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputMask from "react-input-mask";
import ReactSelect from "react-select";

export default function CreateReport() {
  const [clients, setClients] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState(null);
  const [formValues, setFormValues] = useState({
    cliente: 0,
    fazenda: "",
    quemColetou: "",
    municipio: "",
    estado: "",
    entradaNoLab: "",
    datadaColeta: "",
    temperatura: "",
    entreguePor: "",
    Ocorrencias: "",
    identAmostra: [],
    viabilidadeEmAgua: false,
    contaminantes: false,
    contagemDeConidios: false,
    ph: false,
    agua: false,
    solo: false,
    comercial: false,
    onFarm: false,
  });

  const estados = [
    { value: "AC", label: "Acre" },
    { value: "AL", label: "Alagoas" },
    { value: "AP", label: "Amapá" },
    { value: "AM", label: "Amazonas" },
    { value: "BA", label: "Bahia" },
    { value: "CE", label: "Ceará" },
    { value: "DF", label: "Distrito Federal" },
    { value: "ES", label: "Espírito Santo" },
    { value: "GO", label: "Goiás" },
    { value: "MA", label: "Maranhão" },
    { value: "MT", label: "Mato Grosso" },
    { value: "MS", label: "Mato Grosso do Sul" },
    { value: "MG", label: "Minas Gerais" },
    { value: "PA", label: "Pará" },
    { value: "PB", label: "Paraíba" },
    { value: "PR", label: "Paraná" },
    { value: "PE", label: "Pernambuco" },
    { value: "PI", label: "Piauí" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "RN", label: "Rio Grande do Norte" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "RO", label: "Rondônia" },
    { value: "RR", label: "Roraima" },
    { value: "SC", label: "Santa Catarina" },
    { value: "SP", label: "São Paulo" },
    { value: "SE", label: "Sergipe" },
    { value: "TO", label: "Tocantins" },
  ];

  const BACK_END_URL = process.env.REACT_APP_BACK_END_URL;
  
  const dropdownOptions = estados?.map((estado) => ({
    value: estado.value,
    label: estado.label,
  }));

   

  const handleInputChange = (event, index, isAmostra) => {
    const { name, value } = event.target;
    if (isAmostra) {
      setFormValues({ ...formValues, [name]: value });
    } else {
      const newIdentificacoes = [...formValues.identAmostra];
      newIdentificacoes[index] = {
        ...newIdentificacoes[index],
        [name]: value,
      };
      setFormValues({ ...formValues, identAmostra: newIdentificacoes });
    }
  };

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setFormValues({ ...formValues, cliente: parseInt(value, 10) });
  };

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

  const handleAddIdentificacao = () => {
    setFormValues({
      ...formValues,
      identAmostra: [...formValues.identAmostra, {}],
    });
  };

  const handleRemoveIdentificacao = (index) => {
    const newIdentificacoes = [...formValues.identAmostra];
    newIdentificacoes.splice(index, 1);
    setFormValues({ ...formValues, identAmostra: newIdentificacoes });
  };

  const handleSave = async () => {
    if (formValues.identAmostra.length === 0) {
      toast.error(
        "É obrigatório adicionar pelo menos uma identificação de amostra."
      );
      return;
    }

    try {
      const response = await axios.post(`${BACK_END_URL}/amostras`, formValues);
      console.log("Dados enviados com sucesso!");
      console.log("Resposta da rota /amostras:", response.data);
      toast.success("Amostra cadastrada");
    } catch (error) {
      console.log(error);
      toast.error("Preencha os campos corretamente");
    }
  };

  return (
    <Container>
      <Title>Dados da Amostra</Title>

      <SelectClient>
        <h1>Selecione o cliente</h1>
      </SelectClient>
      <select
        name="cliente"
        onChange={handleSelectChange}
        style={{ height: "30px", width: "300px" }}
      >
        <option value={null}>Selecione o cliente:</option>
        {clients?.map((client) => (
          <option key={client.id} value={parseInt(client.id)}>
            {client.name}
          </option>
        ))}
      </select>
      <AmostraContainer>
        <Grid>
          <GridItem>
            <Label htmlFor="fazenda">Fazenda:</Label>
            <StyledInputMask
              type="text"
              id="fazenda"
              name="fazenda"
              value={formValues.fazenda}
              onChange={(event) => handleInputChange(event, null, true)}
            />
            <Label htmlFor="quemColetou">Quem coletou:</Label>
            <StyledInputMask
              type="text"
              id="quemColetou"
              name="quemColetou"
              value={formValues.quemColetou}
              onChange={(event) => handleInputChange(event, null, true)}
            />
          </GridItem>
          <GridItem>
            <Label htmlFor="municipio">Município:</Label>
            <StyledInputMask
              type="text"
              id="municipio"
              name="municipio"
              value={formValues.municipio}
              onChange={(event) => handleInputChange(event, null, true)}
            />

            <Label htmlFor="estado">Estado:</Label>
            <ReactSelect
              options={dropdownOptions}
              value={selectedEstado}
              onChange={(option) => {
                setSelectedEstado(option);
                setFormValues({
                  ...formValues,
                  estado: option.value, // atualiza o valor do campo "estado" em "formValues"
                });
              }}
              styles={{
                control: (provided) => ({
                  ...provided,
                  marginTop: "0.5rem",
                }),
              }}
            />
            <StyledInputMask
              type="text"
              id="estado"
              name="estado"
              value={selectedEstado?.label ?? formValues.estado}
              onChange={(event) => handleInputChange(event, null, true)}
              style={{ display: "none" }}
            />
          </GridItem>

          <GridItem>
            <Label htmlFor="entradaNoLab">Entrada no laboratório:</Label>
            <StyledInputMask
              mask="99/99"
              type="text"
              id="entradaNoLab"
              name="entradaNoLab"
              value={formValues.entradaNoLab}
              onChange={(event) => handleInputChange(event, null, true)}
            />

            <Label htmlFor="datadaColeta">Data da coleta:</Label>
            <StyledInputMask
              mask="99/99"
              type="text"
              id="datadaColeta"
              name="datadaColeta"
              value={formValues.datadaColeta}
              onChange={(event) => handleInputChange(event, null, true)}
            />

            <Label htmlFor="temperatura">Temperatura:</Label>
            <StyledInputMask
              mask="99°C"
              type="text"
              id="temperatura"
              name="temperatura"
              value={formValues.temperatura}
              onChange={(event) => handleInputChange(event, null, true)}
            />
            <label htmlFor="onFarm">
              OnFarm:
              <input
                type="checkbox"
                id="onFarm"
                name="onFarm"
                checked={formValues.onFarm}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    onFarm: event.target.checked,
                  })
                }
              />
            </label>
            <label htmlFor="comercial">
              Comercial:
              <input
                type="checkbox"
                id="comercial"
                name="comercial"
                checked={formValues.comercial}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    comercial: event.target.checked,
                  })
                }
              />
            </label>
            <label htmlFor="solo">
              Solo:
              <input
                type="checkbox"
                id="solo"
                name="solo"
                checked={formValues.solo}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    solo: event.target.checked,
                  })
                }
              />
            </label>

            <label htmlFor="agua">
              Agua:
              <input
                type="checkbox"
                id="agua"
                name="agua"
                checked={formValues.agua}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    agua: event.target.checked,
                  })
                }
              />
            </label>
          </GridItem>
          <GridItem>
            <Label htmlFor="entreguePor">EntreguePor:</Label>
            <Input
              type="text"
              id="entreguePor"
              name="entreguePor"
              value={formValues.entreguePor}
              onChange={(event) => handleInputChange(event, null, true)}
            />

            <Label htmlFor="ocorrencias">Ocorrências:</Label>
            <TextArea
              id="Ocorrencias"
              name="Ocorrencias"
              value={formValues.Ocorrencias}
              onChange={(event) => handleInputChange(event, null, true)}
            />
            <label htmlFor="viabilidadeEmAgua">
              Viabilidade em água:
              <input
                type="checkbox"
                id="viabilidadeEmAgua"
                name="viabilidadeEmAgua"
                checked={formValues.viabilidadeEmAgua}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    viabilidadeEmAgua: event.target.checked,
                  })
                }
              />
            </label>
            <label htmlFor="contagemDeConidios">
              contagemDeConidios
              <input
                type="checkbox"
                id="contagemDeConidios"
                name="contagemDeConidios"
                checked={formValues.contagemDeConidios}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    contagemDeConidios: event.target.checked,
                  })
                }
              />
            </label>
            <label htmlFor="ph">
              ph:
              <input
                type="checkbox"
                id="ph"
                name="ph"
                checked={formValues.ph}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    ph: event.target.checked,
                  })
                }
              />
            </label>
          </GridItem>
        </Grid>
      </AmostraContainer>
      <Title>Identificação da amostra</Title>
      <ButtonAdd onClick={handleAddIdentificacao}>
        <FaPlus size={30} style={{ marginRight: "15px" }} />{" "}
        <p>Adicionar Identificação de Amostra</p>
      </ButtonAdd>
      {formValues.identAmostra.map((identificacao, index) => (
        <ConteinerIdent key={index}>
          <Grid>
            <GridItem>
              <Label htmlFor={`Código${index}`}>Código</Label>
              <Inpute
                type="text"
                id={`codigo${index}`}
                name="codigo"
                value={identificacao.codigo || ""}
                onChange={(event) => handleInputChange(event, index, false)}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />

              <Label htmlFor={`Fabricacao${index}`}>Fabricação</Label>
              <Inpute
                mask="99/99/9999"
                type="text"
                id={`fabricacao${index}`}
                name="fabricacao"
                value={identificacao.fabricacao || ""}
                onChange={(event) => handleInputChange(event, index, false)}
              />

              <Label htmlFor={`Vencimento${index}`}>Vencimento</Label>

              <Inpute
                mask="99/99/9999"
                type="text"
                id={`vencimento${index}`}
                name="vencimento"
                value={identificacao.vencimento || ""}
                onChange={(event) => handleInputChange(event, index, false)}
              />
            </GridItem>
            <GridItem>
              <Label htmlFor={`MicroorganismoDaAmostra${index}`}>
                Microorganismo
              </Label>
              <Inpute
                type="text"
                id={`microorganismo${index}`}
                name="microorganismo"
                value={identificacao.microorganismo || ""}
                onChange={(event) => handleInputChange(event, index, false)}
              />
              <Label htmlFor={`ProdutoCultura${index}`}>Produto/Cultura</Label>
              <Inpute
                type="text"
                id={`produto-${index}`}
                name="produtocultura"
                value={identificacao.produtocultura || ""}
                onChange={(event) => handleInputChange(event, index, false)}
              />

              <Label htmlFor={`ValorDaAmostra${index}`}>
                Valor da amostra (R$)
              </Label>
              <Inpute
                type="text"
                id={`valor-${index}`}
                name="preco"
                value={identificacao.preco || ""}
                onChange={(event) => handleInputChange(event, index, false)}
              />
            </GridItem>
          </Grid>
          <ButtonRemove onClick={() => handleRemoveIdentificacao(index)}>
            <FaTimes size={30} style={{ marginRight: "15px" }} />{" "}
            <p>
              Remover Identificação <br></br> de Amostra
            </p>
          </ButtonRemove>
        </ConteinerIdent>
      ))}
      <ButtonSave onClick={handleSave}>Salvar</ButtonSave>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #228896;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;

  margin-top: 30px;
  justify-content: space-between;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 10px;
  }
`;

const TextArea = styled.textarea`
  width: 90%;
  height: 115px;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #0077ff;
  }
`;

const ButtonAdd = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #228896;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  width: 50%;
  height: 60px;

  p {
    font-size: 15px;
    font-weight: bold;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #0066cc;
  }
`;

const ButtonRemove = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #228896;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 15px;
    font-weight: bold;
  }

  &:hover {
    background-color: #0066cc;
  }
`;


const ButtonSave = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #228896;
  color: white;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 10px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #0066cc;
  }
`;

const ConteinerIdent = styled.div`
  background-color: lightgray;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 50%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  padding: 10px;
  padding-left: 60px;
  margin-top: 20px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.8) 100%
  );
`;

export const Input = styled.input`
  padding: 15px;
  padding-right: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const Label = styled.label`
  margin-bottom: 5px;
`;

export const Inpute = styled(InputMask)`
  padding: 15px;

  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;


const AmostraContainer = styled.div`
  padding: 40px;
  background-color: lightgray;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  margin-top: 2%;
  margin-bottom: 4%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.8) 100%
  );
`;

export const SelectClient = styled.div`
  h1 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }
`;

const StyledInputMask = styled(InputMask)`
  padding: 15px;
  padding-right: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;
