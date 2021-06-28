import * as React from "react";

import FavoriteCards from "../../components/Home/FavoriteCards";
import Search from "../../components/Home/Search";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <div>
      <Search />
      <FavoriteCards />
    </div>
  );
};

export default Home;
