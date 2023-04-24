import styled from "styled-components";
import Clients from "../../components/Clientes";
import labimage from "../../images/labimage.webp";

export default function ClientsPage() {
  return (
    <>
      <ContainerPage>
        <Clients />
      </ContainerPage>
    </>
  );
}

// Styled Components

export const ContainerPage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 90vh;
  background-image: url(${labimage});
  background-size: cover;
  background-position: center center;
  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
  }
`;
