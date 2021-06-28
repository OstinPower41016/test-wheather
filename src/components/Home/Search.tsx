import * as React from "react";
import styled from "styled-components";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";

import { setStatusModal, setSearchText } from "../../store/modal/modalSlice";
import { useAppSelector } from "../../hooks/redux";

interface ISearchProps {}

const Search: React.FunctionComponent<ISearchProps> = (props) => {
  const dispatch = useDispatch();
  const inputValue = useAppSelector((state) => state.modal.searchText);

  return (
    <SearchElement className="flex justify-between container mx-auto rounded w-6/12 mt-4">
      <InputElement
        placeholder="Введите город..."
        className="py-2 px-4"
        value={inputValue}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setSearchText({ searchText: e.target.value }))
        }
      />
      <ButtonElement
        className="flex items-center py-2 px-4"
        onClick={() => dispatch(setStatusModal())}
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
`;
const ButtonElement = styled.button`
  background: #3c3cce;
  color: white;
  border-radius: 0 0.25rem 0.25rem 0;
`;
const SearchElement = styled.div`
  border: 1px solid black;
`;

export default Search;
