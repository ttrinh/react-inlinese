import styled, { keyframes } from 'styled-components';


export const Container = styled.span`
    position: relative;
    text-align: left;
    cursor: inherit;

    box-sizing: border-box;
    * { box-sizing: border-box; }

    .rie {

    }

    .rie-edit-indicator {
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

    &:hover .rie-edit-indicator {
        right: -26px;
        opacity: 1;
    }
`;

const elasticShow = keyframes`
    from { opacity: 0;  transform: scale(1, .7);  height: 0px;}
    60% { opacity: .3; transform: scale(1, 1.1); height: auto;}
    100% { opacity: 1; transform: scale(1, 1); }
`;

export const InputBox = styled.span`
    border-radius: ${props => props.roundness};
    height: 0;
    opacity: 0;
    display: none;
    border-bottom-right-radius: 0;

    z-index: 200;
    position: absolute;
    top: -10px;
    left: -10px;

    textarea, .textarea-clone {
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
        overflow-y: hidden;

    }

    textarea {
        box-shadow: rgba(0, 0, 0, 0.09) 0px 1px 6px, rgba(0, 0, 0, 0.09) 0px 1px 4px;
    }

    textarea:focus {
        border-color: ${props => props.color};
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
        opacity: .8;
    }

    &.rie-show {
        height: auto;
        display: block;
        opacity: 1;
        animation: ${elasticShow} .2s ease-in;
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
    padding: .5em 1em;
    opacity: .4;
    font: bold 8px Arial, sans-serif;
    text-transform: uppercase;
    letter-spacing: -.25px;

    span {
        margin-right: 5px;
    }

    b {
        display: inline-block;
        padding: 2px 3px;
        margin-right: 2px;
        border-radius: 3px;
        border: 1px solid rgba(0,0,0,.2);
    }
`;
