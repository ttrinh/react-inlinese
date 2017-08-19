import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MdCheck from 'react-icons/lib/md/check';
import MdClear from 'react-icons/lib/md/clear';


const Container = styled.span`
    display: block;;
    text-align: right;
    background-color: white;
    color: #ccc;

    button {
        color: ${props => props.textColor};
        background-color: ${props => props.bgColor};
        border-radius: ${props => props.roundness};
        transition: all .2s ease;
        border: 0;
        outline: none;
        cursor: pointer;
        color: white;
        padding: .25em 1em;
        border: 1px solid rgba(0,0,0,.05);
        opacity: .85;

        &:hover {
            opacity: 1;
        }

        &:active {
            transform: scale(.98, .98);
        }
    }

    button.submit {
        border-radius: 0 0 0 ${props => props.roundness};
    }

    button.cancel {
        border-radius: 0 0 ${props => props.roundness} 0;
    }
`;


const Buttons = ({
    submit,
    cancel,
    submitText,
    cancelText,
    bgColor,
    textColor,
    roundness,
}) => (
    <Container
        bgColor={bgColor}
        textColor={textColor}
        roundness={roundness}
    >
        <button className="submit" onClick={submit} >
            <MdCheck size={16} /> {submitText}
        </button>
        <button className="cancel" onClick={cancel} >
            <MdClear size={16} /> {cancelText}
        </button>
    </Container>
);

Buttons.propTypes = {
    submit: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    roundness: PropTypes.string,
    submitText: PropTypes.string,
    cancelText: PropTypes.string,
};

Buttons.defaultProps = {
    submitText: 'submit',
    cancelText: 'cancel',
    cancel: 'cancel',
    bgColor: '#555',
    textColor: 'white',
    roundness: '3px',
};


export default Buttons;
