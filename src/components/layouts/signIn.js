import styled from "styled-components";

export default function TabletLayout({ children }) {
  return <SignInLayout>{children}</SignInLayout>;
}

export const SignInLayout = styled.div`
  display: flex;
  flex-direction: column; /* centraliza verticalmente */
  align-items: center;
  justify-content: center; /* centraliza verticalmente */
  height: 100vh;
`;
