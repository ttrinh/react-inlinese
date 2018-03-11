import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MdCheck from 'react-icons/lib/md/check';
import MdClear from 'react-icons/lib/md/clear';

const Container = styled.span`
  display: block;
  text-align: right;
  color: #ccc;
  line-height: 0;

  .rie-button {
    padding-left: 6px;
  }

  button {
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;
    padding: 4px 10px;

    /* color: ${props => props.textColor}; */
    /* background-color: ${props => props.bgColor}; */
    background-color: white;
    color: rgba(0, 0, 0, 0.8);
    border-radius: ${props => props.roundness};
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 0px 0px rgba(0,0,0,0.1), 0 1px 1px rgba(0,0,0,0.05);
    transition: all 0.3s ease-out);

    &:active {
      transform: scale(0.98, 0.98);
    }
  }

  button:hover {
    box-shadow: 0 0px 0px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.2);
  }
`;

const Buttons = ({
  submit,
  cancel,
  submitText,
  cancelText,
  bgColor,
  textColor,
  roundness
}) => (
  <Container bgColor={bgColor} textColor={textColor} roundness={roundness}>
    <span className="rie-button">
      <button className="submit" onClick={submit} title={submitText || 'apply'}>
        <MdCheck size={16} /> {submitText}
      </button>
    </span>

    <span className="rie-button">
      <button className="cancel" onClick={cancel} title={cancelText}>
        <MdClear size={16} /> {cancelText}
      </button>
    </span>
  </Container>
);

Buttons.propTypes = {
  submit: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  roundness: PropTypes.string,
  submitText: PropTypes.string,
  cancelText: PropTypes.string
};

Buttons.defaultProps = {
  submitText: 'submit',
  cancelText: 'cancel',
  cancel: 'cancel',
  bgColor: '#555',
  textColor: 'white',
  roundness: '3px'
};

export default Buttons;
