import * as React from "react";
import styled from "styled-components";
import { AiFillStar, AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import cn from "classnames";

import { getWheather } from "../../api/weather";
import { setStatusModal, addFavoriteCity, removeFavoriteCity } from "../../store/modal/modalSlice";

interface ICardProps {
  searchText: string;
  className?: string;
}

type TCityWeather = {
  name: string;
  temp: number;
  feels_like: number;
  description: string;
  iconURL: string;
  pressure: number;
  isFavorite: boolean;
};

const checkFavoriceCity = (city: string) => {
  return (
    !!localStorage
      .getItem("favoriteCities")
      ?.trim()
      .split(" ")
      .find((val) => val === city) || false
  );
};

const Card: React.FunctionComponent<ICardProps> = (props) => {
  const dispatch = useDispatch();
  const [cityWeather, setCityWeather] = React.useState<TCityWeather>();
  const [statusError, setStatusError] = React.useState(false);

  React.useEffect(() => {
    getWheather(props.searchText).then((res) => {
      if (!res) {
        setStatusError(true);
      } else {
        setCityWeather({
          name: res.name,
          temp: Math.round(res.main.temp),
          feels_like: Math.round(res.main.feels_like),
          description: res.weather[0].description,
          iconURL: `http://openweathermap.org/img/w/${res.weather[0].icon}.png`,
          pressure: res.main.pressure,
          isFavorite: checkFavoriceCity(res.name),
        });
      }
    });
  }, []);

  const setFavoiteCity = (name: string) => {
    const currentFavoriteCities = localStorage
      .getItem("favoriteCities")
      ?.trim()
      .split(" ")
      .find((city) => city === name);
    if (currentFavoriteCities) {
      dispatch(removeFavoriteCity({ city: name }));
      setCityWeather({
        ...cityWeather!,
        isFavorite: false,
      });
    } else {
      dispatch(addFavoriteCity({ city: name }));
      setCityWeather({
        ...cityWeather!,
        isFavorite: true,
      });
    }
  };

  return (
    <>
      {!statusError && (
        <CardElement
          className={cn("py-3 px-5 rounded", {
            [props.className!]: props.className ? props.className : "",
          })}
          isAbsolute={props.className === "absolute"}
        >
          <div className="flex items-center justify-between">
            <span className="mr-4">{cityWeather?.name}</span>
            <div className="flex items-center">
              <img className="mr-2" src={cityWeather?.iconURL} alt={cityWeather?.description} />
              <span className="text-xl font-bold">{cityWeather?.temp} &#8451;</span>
            </div>
            <div className="flex">
              <ButtonElement
                className="mr-2"
                isFavorite={cityWeather?.isFavorite}
                onClick={() => setFavoiteCity(cityWeather?.name!)}
              >
                <AiFillStar />
              </ButtonElement>
              <ButtonElement onClick={() => dispatch(setStatusModal())}>
                <AiOutlineCloseCircle />
              </ButtonElement>
            </div>
          </div>
          <p>
            <strong>Ощущается как:</strong> {cityWeather?.feels_like} &#8451;
          </p>
          <p>
            <strong>Атмосферное давление:</strong> {cityWeather?.pressure} мбар
          </p>
        </CardElement>
      )}
      {statusError && (
        <CityNotFound className="absolute flex px-4 py-3">
          <TextCard className="mr-4">По данному поисковому запросу не было найденно ни одного города</TextCard>
          <IconClose onClick={() => dispatch(setStatusModal())}>
            <AiOutlineCloseCircle />
          </IconClose>
        </CityNotFound>
      )}
    </>
  );
};

type TCardElement = {
  isAbsolute?: boolean;
};

const CityNotFound = styled.div`
  top: 20%;
  left: 50%;
  transform: translate(-50%);
  background: white;
`;

const TextCard = styled.div`
`;
const IconClose = styled.div``;

const CardElement = styled.div`
  box-shadow: 0 0 3px #b19c9c;
  background: linear-gradient(135deg, #19506d, #abd0e224);
  top: 20%;
  left: 50%;
  transform: ${(props: TCardElement) => (props.isAbsolute ? "translate(-50%)" : "")};
  color: #0b0b0b;
`;

type TButtonElement = {
  isFavorite?: boolean;
};
const ButtonElement = styled.div`
  cursor: pointer;
  color: ${(props: TButtonElement) => (props.isFavorite ? "gold" : "#3e3e3e")};
  transition: 1s;
`;

export default Card;
