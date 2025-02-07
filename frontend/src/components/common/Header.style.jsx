import styled, { createGlobalStyle } from "styled-components";

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #00462A;
  height: 128px;
  padding: 0 20px;
`;

export const Logo = styled.div`
  img {
    height: 90px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

export const BuyButton = styled.a`
  display: inline-block;
  text-decoration: none;
  color: #00462A;
  font-size: 56px;
  font-weight: 400;
  background-color: #FCFFEC;
  padding: 10px 20px;
  border-radius: 50px;
  transition: background-color 0.3s;
`;

export const MypageButton = styled.a`
  img {
    height: 91px;
  }
`;