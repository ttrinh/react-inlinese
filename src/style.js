import styled from 'styled-components';


export const Container = styled.span`
    position: relative;
    text-align: left;

    box-sizing: border-box;
    * { box-sizing: border-box; }

    .edit-indicator {
        position: absolute;
        background-color: white;
        top: -5px;
        right: 0;
        width: 24px;
        height: 24px;
        text-align: center;
        font: sans-serif;
        font-weight: normal;
        border-radius: 50%;
        border: 1px solid rgba(0,0,0,.2);
        transition: all .12s ease;
        color: #555;
        opacity: 0;
    }

    &:hover .edit-indicator {
        right: -26px;
        opacity: 1;
    }
`;

export const InputBox = styled.span`
    height: ${props => (props.show ? 'auto' : '0')};
    opacity: ${props => (props.show ? '1' : '0')};
    border-radius: ${props => props.roundness};
    border-bottom-right-radius: 0;

    z-index: 200;
    position: absolute;
    top: -10px;
    left: -10px;
    overflow: hidden;
    transition: all .2s ease;
    background-color: white;

    textarea {
        border-radius: ${props => props.roundness};
        box-sizing: border-box;
        resize: none;
        outline: none;
        vertical-align: top;
        font: inherit;
        padding: 10px;
        transition: all .1s ease;
        border: 1px solid rgba(0,0,0,.1);
        border-bottom-right-radius: 0;
        margin: 0;
        box-shadow: rgba(0, 0, 0, 0.09) 0px 1px 6px, rgba(0, 0, 0, 0.09) 0px 1px 4px;
    }

    textarea:focus {
        border-color: ${props => props.color};
    }
`;

export const Label = styled.span`
    cursor: pointer;
    position: relative;

    &:hover {
        border-bottom: 1px dashed rgba(0,0,0,.2);
    }
`;

export const Hint = styled.span`
    color: ${props => props.color};

    position: absolute;
    user-select: none;
    left: 0;
    bottom: 25px;
    padding: .5em 1em;
    opacity: .4;
    font: normal 11px Arial, sans-serif;
    letter-spacing: -.25px;
`;
