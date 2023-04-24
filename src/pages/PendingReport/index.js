import styled from "styled-components";
import PendingReport from "../../components/PendingReports";

export default function PendingReportPage() {
  return (
    <PendingReportPageContainer>
      <PendingReport />
    </PendingReportPageContainer>
  );
}

export const PendingReportPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
`;
