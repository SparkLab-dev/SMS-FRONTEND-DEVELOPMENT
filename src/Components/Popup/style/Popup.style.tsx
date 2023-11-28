import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(50, 50, 50, 0.6);
  z-index: 10;
`;
export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  position: fixed;
  background-color: #ffff;
  color: #ffffff;
  box-shadow: 0px 4px 20px rgba(25, 29, 58, 0.1);
  border-radius: 10px;
  width: 100%;
  max-width: 380px;
`;
export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #ffff;
  /* padding: 0px 30px; */
  border-radius: 10px 10px 0px 0px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 23px;
  flex: none;
  order: 0;
  /* align-self: stretch; */
  flex-grow: 0;
  text-align: center;
`;
export const ModalBody = styled.div`
  flex: 1;
  padding: 10px 25px;
  background-color: white;
`;

export const ModalFooter = styled.div`
  display: flex;
  width: 300px;
  /* height: 40px; */
  align-items: center;
  justify-content: center;
  padding: 5px 0px 25px 0px;
`;