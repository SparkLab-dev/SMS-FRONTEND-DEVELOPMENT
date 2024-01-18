import styled from "styled-components";

export const ButtonHolder = styled.div`
  width: 100%;
  max-width: 300px;
  margin: auto;
`;
export const ButtonCont = styled.button`
  /* background: #3F68D4ff; */
  background: #006466;
  font-size: 16px;
  font-family: "Poppins";
  padding: 15px 0px;
  border-radius: 10px;
  border: 1px solid #006466;
  text-transform: capitalize;
  font-weight: 600;
  display: flex;
  align-items: center;
  width: 100%;
  color: #ffffff;
  cursor: pointer;
  transition: 0.2s;
  justify-content: center;
  margin-top: 32px;
  &:hover {
    background: #00646642;
    border-radius: 10px;
    color: #006466;
    border: 1px solid transparent;
  }
  &:disabled {
    opacity: 0.6;
    filter: saturate(60%);
  }
`;
