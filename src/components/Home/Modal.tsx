import * as React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { setStatusModal } from "../../store/modal/modalSlice";
import { useAppSelector } from "../../hooks/redux";
import Card from "./Card";

interface IModalProps {}

const Modal: React.FunctionComponent<IModalProps> = (props) => {
  const { isOpen, searchText } = useAppSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <>
      {isOpen && (
        <DialogElement open className="absolute h-screen w-screen ">
          <ModalElement className="z-20">
            <Card searchText={searchText} className="absolute" />
          </ModalElement>
          <BackDropElement
            className="w-full h-full z-10"
            onClick={() => dispatch(setStatusModal())}
          />
        </DialogElement>
      )}
    </>
  );
};

const ModalElement = styled.div``;
const BackDropElement = styled.div`
  background: #ccccccbd;
`;
const DialogElement = styled.dialog`
  background: transparent;
  top: 0;
`;

export default Modal;
