import styled from "styled-components";
import AllClients from "../../components/AllClients";


export default function AllClientsPage() {
  return (
    <>
      <AllClientsPageContainer>
        <AllClients />
      </AllClientsPageContainer>
    </>
  );
}


export const AllClientsPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
`;
