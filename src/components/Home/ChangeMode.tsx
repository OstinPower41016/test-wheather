import * as React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { setStatus } from "../../store/mode/modeSlice";

interface IChangeModeProps {}

const ChangeMode: React.FunctionComponent<IChangeModeProps> = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto flex justify-end mt-4">
      <LabelElement>
        <InputElement type="checkbox" onClick={() => dispatch(setStatus())} />
        <Switch></Switch>
      </LabelElement>
    </div>
  );
};

const LabelElement = styled.label`
  display: inline-block;
  height: 28px;
  line-height: 28px;
  margin-right: 10px;
  position: relative;
  vertical-align: middle;
  font-size: 14px;
  user-select: none;
`;

const InputElement = styled.input`
  display: block;
  width: 0;
  height: 0;
  opacity: 0;
  &:checked + span {
    background-color: #70c767;
  }
  &:checked + span::before {
    left: 0;
  }
  &:checked + span::after {
    transform: translate3d(148px, 0, 0);
    color: #4fb743;
  }
`;

const Switch = styled.span`
  display: inline-block;
  height: 28px;
  width: 300px;
  box-sizing: border-box;
  position: relative;
  border-radius: 2px;
  background: #848484;
  transition: background-color 0.3s cubic-bezier(0, 1, 0.5, 1);
  &::before {
    content: "Пользовательский";
    display: inline-block;
    box-sizing: border-box;
    width: 150px;
    padding: 0 12px;
    position: absolute;
    top: 0;
    left: 150px;
    text-transform: uppercase;
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    font-size: 10px;
    line-height: 28px;
  }
  &::after {
    content: "Предустанновленный";
    display: inline-block;
    box-sizing: border-box;
    width: 150px;
    border-radius: 1px;
    position: absolute;
    top: 1px;
    left: 1px;
    z-index: 5;
    text-transform: uppercase;
    text-align: center;
    background: white;
    line-height: 26px;
    font-size: 10px;
    color: #777;
    transition: transform 0.3s cubic-bezier(0, 1, 0.5, 1);
  }
`;

export default ChangeMode;
