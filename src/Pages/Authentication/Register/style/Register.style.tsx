import styled from "styled-components";

export const RegisterDontHaveAccountHold = styled.div`
  display: flex;
  justify-content: center;
  font-family: "Poppins";
`;
export const RegisterButtonHolder = styled.div`
  width: 100%;
  max-width: 300px;
  margin: auto;
`;
export const RegParagraph = styled.p`
  font-size: 15px;
  font-family: "Poppins";
`;
export const InputsHolder = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    display: block;
  }
`;
export const InputContainer = styled.div`
  flex: 1;
  margin: 5px;
`;
export const RegisterFormContainer = styled.div`
  flex: 1;
  margin: auto;
  align-items: center;
`;
export const RegisterContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 800px;
  @media screen and (max-width: 550px) {
    flex-direction: column-reverse;
    min-height: 674px;
  }
`;
