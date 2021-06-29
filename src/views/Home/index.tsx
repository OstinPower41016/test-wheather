import * as React from "react";

import FavoriteCards from "../../components/Home/FavoriteCards";
import Search from "../../components/Home/Search";
import ChangeMode from "../../components/Home/ChangeMode";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <div>
      <ChangeMode />
      <Search />
      <FavoriteCards />
    </div>
  );
};

export default Home;
