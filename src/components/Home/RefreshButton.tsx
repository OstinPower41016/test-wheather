import * as React from "react";
import { IoMdRefresh } from "react-icons/io";
import cn from "classnames";
import { useDispatch } from "react-redux";

import { refreshCashedData } from "../../store/cashed/cashedSlice";
import styled from "styled-components";

interface IRefreshButtonProps {
  className?: string;
}

const RefreshButton: React.FunctionComponent<IRefreshButtonProps> = (props) => {
  const dispatch = useDispatch();

  const onButtonRefreshHandler = () => {
    dispatch(refreshCashedData());
  };

  return (
    <Button
      className={cn("flex items-center rounded", { [props.className!]: props.className })}
      onClick={onButtonRefreshHandler}
    >
      <p className="mr-2">Перезагрузить</p>
      <IoMdRefresh />
    </Button>
  );
};

const Button = styled.button`
  border: 1px solid black;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
`;

export default RefreshButton;
