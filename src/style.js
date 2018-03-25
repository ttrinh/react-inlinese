import styled, { keyframes } from 'styled-components';

export const Container = styled.span`
  position: relative;
  text-align: left;
  cursor: inherit;

  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }

  .rie {
  }

  .rie-edit-indicator-wrapper {
    position: relative;
  }

  .rie-edit-indicator {
    position: absolute;
    background-color: white;
    top: 0;
    right: 0;
    width: 24px;
    height: 24px;
    text-align: center;
    font-family: sans-serif;
    font-weight: normal;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    transition: all 0.12s ease;
    color: #555;
    opacity: 0;
    line-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover .rie-edit-indicator {
    right: -24px;
    opacity: 1;
  }

  ${props => props.styleString};
`;

const elasticShow = keyframes`
    from { opacity: 0;  transform: scale(1, .7); height: 0px;}
    60% { opacity: .3; transform: scale(1, 1.1); height: auto;}
    100% { opacity: 1; transform: scale(1, 1); }
`;

export const InputBox = styled.span`
  border-radius: ${props => props.roundness};
  height: 0;
  opacity: 0;
  display: none;

  z-index: 200;
  position: absolute;
  top: -10px;
  left: -10px;
  overflow: hidden;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 1px 6px, rgba(0, 0, 0, 0.09) 0px 1px 4px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-color: ${props => props.color};

  &.rie-show {
    height: auto;
    display: block;
    opacity: 1;
    animation: ${elasticShow} 0.2s ease-in;
  }

  textarea,
  .textarea-clone {
    box-sizing: border-box;
    resize: none;
    outline: none;
    vertical-align: top;
    font: inherit;
    padding: 10px;
    transition: all 0.1s ease;
    margin: 0;
    overflow: hidden;
  }

  textarea {
    border: 0;
  }

  textarea:focus {
  }

  .textarea-clone {
    white-space: pre-wrap;
    visibility: hidden;
    height: auto !important;
    width: 100% !important;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    opacity: 0.8;
  }

  .rie-button-area {
    display: block;
    position: relative;
    line-height: 0;
    border-top: 1px dashed rgba(0, 0, 0, 0.1);
    padding: 5px;
    background-color: #f7f7f7;
    font-size: 14px;
  }
`;

export const Label = styled.span`
  cursor: pointer;
  position: relative;

  &:hover {
    ${props => props.hoverStyleString};
  }
`;

export const Hint = styled.span`
  color: ${props => props.color};

  position: absolute;
  user-select: none;
  left: 0;
  bottom: 0px;
  padding: 0.5em 1em;
  opacity: 0.4;
  font: bold 8px Arial, sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.25px;

  span {
    margin-right: 5px;
  }

  b {
    display: inline-block;
    padding: 2px 3px;
    margin-right: 2px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  ${props => props.styleString};
`;
