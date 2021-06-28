import * as React from "react";

import Card from "./Card";

interface IFavoriteCardsProps {}

const FavoriteCards: React.FunctionComponent<IFavoriteCardsProps> = (props) => {
  const favoriteCities = new Set(Object.entries(localStorage).flat());
  const [allFavoriteCities, setFavoriteCities] = React.useState();

  React.useEffect(() => {
    if (favoriteCities.size !== 0) {
      const citiesData = favoriteCities.forEach((city) => {
        return <Card key={city} searchText={city} />;
      });
      setFavoriteCities(citiesData!);
    }
  }, [localStorage]);
  console.log(allFavoriteCities);

  return <>{allFavoriteCities}</>;
};

export default FavoriteCards;
