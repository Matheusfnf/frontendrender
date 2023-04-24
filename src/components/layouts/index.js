import React from "react";
import styled from "styled-components";
import Sidebar from "../SideBar/Sidebar";

const TabletLayoutWrapper = styled.div`
  width: 90%;
  height: 90vh;
  margin: 0 auto;
  margin-top: 2.3%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
`;

const SidebarContainer = styled.div`
  width: 15%;
  background-color: #283739;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
`;

export default function TabletLayout({ children }) {
  return (
    <TabletLayoutWrapper>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <ContentContainer>{children}</ContentContainer>
    </TabletLayoutWrapper>
  );
}
