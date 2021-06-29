import * as React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { setStatusModal } from "../../store/modal/modalSlice";
import { useAppSelector } from "../../hooks/redux";
import Card from "./Card";

const Modal: React.FunctionComponent = () => {
  const { isOpen, searchText } = useAppSelector((state) => state.modal);
  const dispatch = useDispatch();

  const closeModalHandler = () => dispatch(setStatusModal());

  return (
    <>
      {isOpen && (
        <DialogElement open className="absolute h-screen w-screen ">
          <div className="z-20">
            <Card searchText={searchText} className="absolute" />
          </div>
          <BackDropElement className="w-full h-full z-10" onClick={closeModalHandler} />
        </DialogElement>
      )}
    </>
  );
};

const BackDropElement = styled.div`
  background: #ccccccbd;
`;
const DialogElement = styled.dialog`
  background: transparent;
  top: 0;
`;

export default Modal;
