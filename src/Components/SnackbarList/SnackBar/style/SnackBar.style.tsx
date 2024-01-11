import styled from "styled-components";

interface SnackBarProp {
  type?: string;
}

export const SnackBarCard = styled.div<SnackBarProp>`
  background-color: ${({ type }) => {
    switch (type) {
      case "success":
        return "green";
      case "error":
        return "red";
      case "warning":
        return "orange";
      case "info":
        return "blue";
      default:
        return "gray";
    }
  }};
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MessageBox = styled.div`
  flex-grow: 1;
  margin-right: 10px;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;
`;
