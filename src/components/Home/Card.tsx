import * as React from "react";
import styled from "styled-components";
import { AiFillStar, AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import cn from "classnames";

import { getWheather } from "../../api/weather";
import { setStatusModal, addFavoriteCity, removeFavoriteCity } from "../../store/modal/modalSlice";
import { setCashedCity, updateFavorite } from "../../store/cashed/cashedSlice";
import { useAppSelector } from "../../hooks/redux";

interface ICardProps {
  searchText: string;
  className?: string;
  noClose?: boolean;
}

export interface TCityWeather {
  name: string;
  temp: number;
  feels_like: number;
  description: string;
  iconURL: string;
  pressure: number;
  isFavorite: boolean;
}

interface TButtonElement {
  isFavorite?: boolean;
}

interface TCardElement {
  isAbsolute?: boolean;
}

const checkFavoriceCity = (city: string) => {
  return Boolean(
    localStorage
      .getItem("favoriteCities")
      ?.trim()
      .split(" ")
      .find((val) => val === city),
  );
};

const Card: React.FunctionComponent<ICardProps> = (props) => {
  const dispatch = useDispatch();
  const [statusError, setStatusError] = React.useState(false);
  const cityData = useAppSelector((state) => state.cashed);

  React.useEffect(() => {
    if (cityData[props.searchText] && cityData[props.searchText].statusUpdate === "") {
      return;
    }
    getWheather(props.searchText).then((res) => {
      if (!res) {
        setStatusError(true);
      } else {
        const dataCity = {
          name: res.name,
          temp: Math.round(res.main.temp),
          feels_like: Math.round(res.main.feels_like),
          description: res.weather[0].description,
          iconURL: `http://openweathermap.org/img/w/${res.weather[0].icon}.png`,
          pressure: res.main.pressure,
          isFavorite: checkFavoriceCity(res.name),
        };
        dispatch(setCashedCity({ city: dataCity.name, dataCity }));
      }
    });
  }, [cityData]);

  const setFavoiteCity = (name: string) => {
    const currentFavoriteCities = localStorage
      .getItem("favoriteCities")
      ?.trim()
      .split(" ")
      .find((city) => city === name);
    if (currentFavoriteCities) {
      dispatch(removeFavoriteCity({ city: name }));
      dispatch(updateFavorite({ city: name, isFavorite: false }));
    } else {
      dispatch(addFavoriteCity({ city: name }));
      dispatch(updateFavorite({ city: name, isFavorite: true }));
    }
  };

  const onButtonCloseHanlder = () => dispatch(setStatusModal());

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
            <span className="mr-4">{cityData[props.searchText]?.name}</span>
            <div className="flex items-center">
              <img
                className="mr-2"
                src={cityData[props.searchText]?.iconURL}
                alt={cityData[props.searchText]?.description}
              />
              <span className="text-xl font-bold">{cityData[props.searchText]?.temp} &#8451;</span>
            </div>
            <div className="flex">
              <ButtonElement
                className="mr-2"
                isFavorite={cityData[props.searchText]?.isFavorite}
                onClick={() => setFavoiteCity(cityData[props.searchText]?.name!)}
              >
                <AiFillStar />
              </ButtonElement>
              {!props.noClose ? (
                <ButtonElement onClick={onButtonCloseHanlder}>
                  <AiOutlineCloseCircle />
                </ButtonElement>
              ) : null}
            </div>
          </div>
          <p>
            <strong>Ощущается как:</strong> {cityData[props.searchText]?.feels_like} &#8451;
          </p>
          <p>
            <strong>Атмосферное давление:</strong> {cityData[props.searchText]?.pressure} мбар
          </p>
        </CardElement>
      )}
      {statusError && (
        <CityNotFound className="absolute flex px-4 py-3">
          <p className="mr-4">По поисковому запросу не было найденно ни одного города</p>
        </CityNotFound>
      )}
    </>
  );
};

const CityNotFound = styled.div`
  top: 20%;
  left: 50%;
  transform: translate(-50%);
  background: white;
`;

const CardElement = styled.div`
  box-shadow: ${(props: TCardElement) => (props.isAbsolute ? "0 0 8px 2px black;" : "")};
  background: linear-gradient(135deg, #19506d, #abd0e2);
  top: 20%;
  left: 50%;
  transform: ${(props: TCardElement) => (props.isAbsolute ? "translate(-50%)" : "")};
  color: #0b0b0b;
  @media (max-width: 600px) {
    left: 50%;
    min-width: 300px;
  }
`;

const ButtonElement = styled.div`
  cursor: pointer;
  color: ${(props: TButtonElement) => (props.isFavorite ? "gold" : "#3e3e3e")};
  transition: 1s;
`;

export default Card;
