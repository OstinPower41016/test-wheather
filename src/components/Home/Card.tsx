import * as React from "react";
import styled from "styled-components";
import { AiFillStar, AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";

import { getWheather } from "../../api/weather";
import { setStatusModal } from "../../store/modal/modalSlice";

interface ICardProps {
  searchText: string;
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

const Card: React.FunctionComponent<ICardProps> = (props) => {
  const dispatch = useDispatch();
  const [cityWeather, setCityWeather] = React.useState<TCityWeather>();

  React.useEffect(() => {
    getWheather(props.searchText).then((res) =>
      setCityWeather({
        name: res.name,
        temp: Math.round(res.main.temp),
        feels_like: Math.round(res.main.feels_like),
        description: res.weather[0].description,
        iconURL: `http://openweathermap.org/img/w/${res.weather[0].icon}.png`,
        pressure: res.main.pressure,
        isFavorite: !!localStorage.getItem(res.name) || false,
      }),
    );
  }, []);

  const setFavoiteCity = (name: string) => {
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name);
      setCityWeather({
        ...cityWeather!,
        isFavorite: false,
      });
    } else {
      localStorage.setItem(name, name);
      setCityWeather({
        ...cityWeather!,
        isFavorite: true,
      });
    }
  };

  return (
    <CardElement className="absolute py-3 px-5 rounded">
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
  );
};

const CardElement = styled.div`
  box-shadow: 0 0 3px #b19c9c;
  background: linear-gradient(135deg, #5cd2b7, #69a3a024);
  top: 20%;
  left: 50%;
  transform: translate(-50%);
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
