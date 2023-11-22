import styled from "styled-components";
export const ItemDiv = styled.div`
  width: 350px;
  &:hover {
    transform: scale(1.05);
    transition: 0.6s;
  }
`;
export const Image = styled.img`
  width: 270px;
  height: 270px;
`;
export const Paragraph = styled.p`
  margin: 6px 0px;
`;
export const ItemPrices = styled.div`
  display: flex;
  gap: 20px;
`;
export const ItemPriceNew = styled.div`
  color: #374151;
  font-size: 18px;
  font-weight: 600;
`;
export const ItemPriceOld = styled.div`
  color: #8c8c8c;
  font-size: 18px;
  font-weight: 500;
`;
