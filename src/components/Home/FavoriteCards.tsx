import * as React from "react";
import styled from "styled-components";


import preInstalled from "../../pre-installed.json";
import Card from "./Card";
import { useAppSelector } from "../../hooks/redux";

const FavoriteCards: React.FunctionComponent = () => {
  const favoriteCities = useAppSelector((state) => state.modal.allFavoriteCities);
  const [cities, setCities] = React.useState<JSX.Element[]>([]);
  const mode = useAppSelector((state) => state.mode.mode);

  const preInstalledCards = React.useMemo(() => {
    return preInstalled.map((city) => <Card searchText={city} noClose key={city}/>)
  }, [preInstalled])

  React.useEffect(() => {
    const citiesArr = favoriteCities.trim().split(" ");

    if (citiesArr[0]) {
      setCities(
        citiesArr.map((city) => <Card key={city} className="static" searchText={city} noClose />),
      );
    }
  }, [favoriteCities]);

  

  return (
    <div className="container mx-auto mt-6">
      <Flex className="flex justify-around flex-wrap">
        {mode === "Предустановленный" ? (
          preInstalledCards
        ) : !!favoriteCities.trim().length ? (
          cities
        ) : (
          <NotFoundFavoriteDate>Избранных нет</NotFoundFavoriteDate>
        )}
      </Flex>
    </div>
  );
};

const Flex = styled.div`
  & > div {
    margin-top: 2rem;
  }
`;

const NotFoundFavoriteDate = styled.span`
  display: block;
  text-align: center;
  width: 100%;
  margin-top: 1rem;
`;

export default FavoriteCards;
