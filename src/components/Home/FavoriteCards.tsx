import * as React from "react";
import styled from "styled-components";

import preInstalled from "../../pre-installed.json";
import Card from "./Card";
import { useAppSelector } from "../../hooks/redux";

interface IFavoriteCardsProps {}

const FavoriteCards: React.FunctionComponent<IFavoriteCardsProps> = (props) => {
  const favoriteCities = useAppSelector((state) => state.modal.allFavoriteCities);
  const [cities, setCities] = React.useState<JSX.Element[]>([]);
  const mode = useAppSelector((state) => state.mode.mode);

  React.useEffect(() => {
    const citiesArr = favoriteCities.trim().split(" ");


    if (citiesArr[0]) {
      setCities(citiesArr.map((city) => <Card key={city} className="static" searchText={city} />));
    }
  }, [favoriteCities]);

  console.log(cities);

  return (
    <div className="container mx-auto mt-6">
      <Flex className="flex justify-around flex-wrap">
        {mode === "Предустановленный"
          ? preInstalled.map((city) => <Card searchText={city} />)
          : cities}
      </Flex>
    </div>
  );
};

const Flex = styled.div`
  & > div {
    margin-top: 2rem;
  }
`;

export default FavoriteCards;
