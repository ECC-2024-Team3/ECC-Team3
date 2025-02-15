import React, { useState } from "react";
import * as S from "./Detail.style";
import Header from "../common/Header";
import { useParams } from "react-router-dom";
import likedbuttonfillpng from "./liked_button_fill.png";
import likedbuttonemptypng from "./liked_button_empty.png";
import productexampleavif from "./product_example.avif";

export function Detail() {
  const { postId } = useParams();

  const [product, setProduct] = useState({
    post_id: 1,
    title: "2019년형 불 들어오는 맥북 프로",
    location: "학생문화관",
    price: 1200000,
    content: "사용감 좀 있어요! 잘 작동합니다!",
    transaction_status: "판매 중",
    image: productexampleavif,
    likes_count: 15,
    bookmarks_count: 7,
    liked: true,
    bookmarked: false,
    user_id: "ewha1886",
  });

  return (
    <div>
      <Header />

      <S.TitleContainer>
        <S.MainTitle>중고 거래 상세 페이지</S.MainTitle>

        <S.LikeButton>
          <img 
            src={product.liked ? likedbuttonfillpng : likedbuttonemptypng} 
            alt="like button"
            style={{ width: "24px", height: "24px" }} 
          />
        </S.LikeButton>

        <S.BookmarkButton>
          {product.bookmarked ? "checked" : "empty"}
        </S.BookmarkButton>
      </S.TitleContainer>

      <S.Line />

      <S.ProductContainer>
        <S.ProductImage src={product.image} alt="상품 이미지" />

        <S.ProductDetails>
          <S.ProductTitle>{product.title}</S.ProductTitle>
          <S.InfoRow>
            <S.InfoLabel>거래 상태</S.InfoLabel>
            <S.InfoValue>{product.transaction_status}</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>거래 장소</S.InfoLabel>
            <S.InfoValue>{product.location}</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>가격</S.InfoLabel>
            <S.InfoValue>{product.price.toLocaleString()}원</S.InfoValue>
          </S.InfoRow>
        </S.ProductDetails>
      </S.ProductContainer>

      <S.Description>
        <S.InfoLabel>설명</S.InfoLabel>
        <S.DescText>{product.content}</S.DescText>
      </S.Description>

      <S.SellerInfo>
        <S.InfoLabel>거래자 정보</S.InfoLabel>
        <S.SellerName>판매자 ID: {product.user_id}</S.SellerName>
      </S.SellerInfo>
    </div>
  );
}