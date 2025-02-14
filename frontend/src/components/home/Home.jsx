import { Link } from "react-router-dom";
import cucumberpng from "./cucumber.png";
import * as S from "./Home.style";

export function Home() {
  return (
    <S.HomeContainer>
      <S.Logo>
        <img src={cucumberpng} alt="로고" className="logo" />
      </S.Logo>
      <S.Nav>
        <Link to="/signup">
          <S.SignupButton>회원가입</S.SignupButton>
        </Link>
        <Link to="/login">
          <S.LoginButton>로그인</S.LoginButton>
        </Link>

        <Link to="/main">
          <S.GoButton>일단 둘러보기</S.GoButton>
        </Link>
      </S.Nav>
    </S.HomeContainer>
  );
}
