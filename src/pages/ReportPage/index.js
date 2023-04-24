import styled from "styled-components";
import CreateReport from "../../components/CreateReport";
import labimage from "../../images/labimage.webp";

export default function ReportPage() {
  return (
    <>
      <ContainerPage>
        <CreateReport />
      </ContainerPage>
    </>
  );
}

const ContainerPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
`;
