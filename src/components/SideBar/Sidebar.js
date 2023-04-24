import {
  SidebarContainer,
  SidebarList,
  SidebarListItem,
  StyledNavLink,
} from "./Sidebar.styles";

import { FaFileAlt, FaUser, FaRegEdit, FaBoxes, FaPlusCircle } from "react-icons/fa";

const Sidebar = () => {
  const linkDiv = (IconComponent, text, grayColor = "gray") => (
    <div
      
      className="sidebar-item"
    >
      <IconComponent
        size={30}
        style={{ color: grayColor }}
      />
      <h1>{text}</h1>
    </div>
  );

  return (
    <SidebarContainer>
      <SidebarList>
        <SidebarListItem>
          <StyledNavLink exact="true" to="/clients" activeclassname="selected-link">
            {({ isActive }) =>
              linkDiv(
                FaRegEdit,
                "Cadastro de Clientes",
                isActive ? "#A9C52F" : "gray"
              )
            }
          </StyledNavLink>
        </SidebarListItem>

        <SidebarListItem>
          <StyledNavLink to="/allclients" activeclassname="selected-link">
            {({ isActive }) =>
              linkDiv(FaUser, "Clientes", isActive ? "#A9C52F" : "gray")
            }
          </StyledNavLink>
        </SidebarListItem>
        <SidebarListItem>
          <StyledNavLink to="/createreport" activeclassname="selected-link">
            {({ isActive }) =>
              linkDiv(
                FaFileAlt,
                "Formulário de solicitação de análises",
                isActive ? "#A9C52F" : "gray"
              )
            }
          </StyledNavLink>
        </SidebarListItem>
        <SidebarListItem>
          <StyledNavLink to="/pendingreport" activeclassname="selected-link">
            {({ isActive }) =>
              linkDiv(
                FaBoxes,
                "Solicitações pendentes",
                isActive ? "#A9C52F" : "gray"
              )
            }
          </StyledNavLink>
        </SidebarListItem>

        <SidebarListItem>
          <StyledNavLink to="/createlaudofinal" activeclassname="selected-link">
            {({ isActive }) =>
              linkDiv(
                FaPlusCircle,
                "Criar Laudo Final",
                isActive ? "#A9C52F" : "gray"
              )
            }
          </StyledNavLink>
        </SidebarListItem>
      </SidebarList>
    </SidebarContainer>
  );
};

export default Sidebar;
