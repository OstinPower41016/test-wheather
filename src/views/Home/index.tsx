import * as React from "react";
import styled from "styled-components";

import { useAppSelector } from "../../hooks/redux";
import FavoriteCards from "../../components/Home/FavoriteCards";
import Search from "../../components/Home/Search";
import ChangeMode from "../../components/Home/ChangeMode";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const favoriteCities = useAppSelector((state) => state.modal.allFavoriteCities);
  const mode = useAppSelector((state) => state.mode.mode);

  const isNotFavoriteData =
    mode === "Пользовательский" ? (
      <NotFoundFavoriteDate>Нет избранных городов</NotFoundFavoriteDate>
    ) : (
      <FavoriteCards />
    );

  return (
    <div>
      <ChangeMode />
      <Search />
      {!!favoriteCities.length ? <FavoriteCards /> : isNotFavoriteData}
    </div>
  );
};

const NotFoundFavoriteDate = styled.span`
  display: block;
  text-align: center;
  width: 100%;
  margin-top: 1rem;
`;

export default Home;
