import styled from "styled-components";

export const InputsHolder = styled.div``;
export const DontHaveAccountHold = styled.div`
  display: flex;
  justify-content: center;
  font-family: "Poppins";
  margin: 12px;
`;
export const Paragraph = styled.p`
  font-size: 15px;
  font-family: "Poppins";
`;
export const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 800px;
  @media screen and (max-width: 550px) {
    flex-direction: column-reverse;
    min-height: 600px;
  }
`;
export const Arrow = styled.div`
  height: 20%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
export const ImgArrow = styled.img`
  position: absolute;
  width: 200px;
  top: 0;
  left: 0;
  @media screen and (max-width: 550px) {
    /* width: 80px;
    top: 150%; */
    display: none;
  }
`;

export const ImgContainer = styled.div`
  width: 62%;
  flex: 1;
  display: flex;
  /* margin: auto; */
  height: 100%;
`;

export const Logo = styled.div`
  /* margin: auto; */
  z-index: 1;
`;
export const ImgLogo = styled.img`
  width: 116%;
  padding-left: 17%;
  margin-top: 50px;
  @media screen and (max-width: 1000px) {
    width: 160%;
  }
  @media screen and (max-width: 800px) {
    width: 133%;
    /* padding-right: 50px; */
  }
  @media screen and (max-width: 550px) {
    margin-top: -30%;
  }
  @media screen and (max-width: 375px) {
    width: 130%;
    margin-left: 10%;
    margin-top: 10%;
  }
`;
export const LoginFormContainer = styled.div`
  flex: 1;
  margin: auto;
  align-items: center;
`;
