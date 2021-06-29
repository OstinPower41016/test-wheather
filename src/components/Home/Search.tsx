import * as React from "react";
import styled from "styled-components";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";

import { setStatusModal, setSearchText } from "../../store/modal/modalSlice";
import { useAppSelector } from "../../hooks/redux";

const Search: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const inputValue = useAppSelector((state) => state.modal.searchText);

  const onInputSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchText({ searchText: e.target.value }));

  const toggleButtonStatusHandler = () => dispatch(setStatusModal());

  return (
    <SearchElement className="flex justify-between container mx-auto rounded w-6/12 mt-4">
      <InputElement
        placeholder="Введите город..."
        className="py-2 px-4"
        value={inputValue}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => onInputSearchHandler(e)}
      />
      <ButtonElement
        className="flex items-center py-2 px-4"
        onClick={toggleButtonStatusHandler}
        disabled={inputValue.length <= 2}
      >
        <span className="mr-4">Поиск</span>
        <BiSearchAlt />
      </ButtonElement>
    </SearchElement>
  );
};

const InputElement = styled.input`
  outline: none;
  background: #e3e3e3;
  width: 100%;
  border-radius: 0.25rem 0 0 0.25rem;
  @media (max-width: 400px) {
    font-size: 12px;
  }
`;
const ButtonElement = styled.button`
  background: #3c3cce;
  color: white;
  border-radius: 0 0.25rem 0.25rem 0;
  transition: 0.3s;
  &:disabled {
    background: #b8b6c3;
    color: black;
  }
  @media (max-width: 400px) {
    font-size: 12px;
  }
`;
const SearchElement = styled.div`
  border: 1px solid black;
  @media (max-width: 600px) {
    width: 90%;
  }
`;

export default Search;
