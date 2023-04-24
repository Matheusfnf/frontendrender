import styled from "styled-components";
import CreateLaudoFinal from "../../components/CreateLaudoFinal";

export default function CreatelaudofinalPage() {
  return (
    <>
      <Container>
        <CreateLaudoFinal />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  width: 80%;
`;
