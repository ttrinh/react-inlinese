import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { findParentByClass } from './helpers';


const rounded = '3px';

const Container = styled.span`
    position: relative;
    text-align: left;
    box-sizing: border-box;

    * {
        box-sizing: border-box;
    }
`;

const InputBox = styled.span`
    z-index: 200;
    position: absolute;
    top: -10px;
    left: -10px;
    overflow: hidden;
    transition: all .2s ease;

    border-radius: ${rounded} ${rounded} 0 ${rounded};
    height: ${props => (props.show ? 'auto' : '0')};
    opacity: ${props => (props.show ? '1' : '0')};

    textarea {
        box-sizing: border-box;
        resize: none;
        vertical-align: top;
        font: inherit;
        padding: 10px;
        transition: all .1s ease;
        border: 1px solid rgba(0,0,0,.1);
        margin: 0;
        box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
    }

    textarea:focus {
        outline: none;
        border-color: rgba(0,0,0,.3);
    }
`;

const SpanBlock = styled.span`
    display: block;
    text-align: right;
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
    background-color: white;
    color: #ccc;
`;

const Button = styled.button`
    border: 0;
    outline: none;
    cursor: pointer;
    background-color: #555;
    color: white;
    padding: .25em 1.5em;
    border: 1px solid rgba(0,0,0,.05);
    border-radius: 0 0 0 ${rounded};

    &:hover {
        background-color: #333;
    }
`;

const Cancel = styled(Button)`
    border-radius: 0 0 ${rounded} 0;
`;

const Label = styled.span`
    cursor: pointer;

    .edit-icon {
        margin-left: .5em;
        display: inline-block;
        transition: all .12s ease;
        transform: rotate(70deg);
        opacity: 0;
    }

    &:hover .edit-icon {
        opacity: 1
    }
`;

/**
 * React component for editing text inline. Only support text as **string**
 */
class InlineEditable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || '',
            show: false,
            inputStyles: {},
        };
        this.switch = this.switch.bind(this);
        this.submit = this.submit.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    onChange(e) { this.setState({ value: e.target.value }); }

    onKeyDown(e) {
        if (e.keyCode === 13) this.submit(); // enter
        if (e.keyCode === 27) this.switch(); // escape
    }

    // calculate the input styles.
    setInputStyles(element) {
        if (this.state.show) return;
        const node = findParentByClass(element, 'r-ie');
        const minWidth = 200;
        const padding = 10;
        const extraSpace = 20;
        const w = node.offsetWidth + (padding * 2) + extraSpace;
        const width = w < minWidth ? minWidth : w;
        const height = node.offsetHeight + (padding * 2) + extraSpace;

        this.setState({
            inputStyles: { width, height },
        });
    }

    switch(e) {
        if (e) {
            this.setInputStyles(e.target);
            this.setState({ value: this.props.value });
        }
        this.setState({ show: !this.state.show });
    }

    submit() {
        if (!this.state.value) return;

        const sanitizedValue = this.state.value.trim();

        if (this.props.onSubmit) {
            this.props.onSubmit.call(null, sanitizedValue);
        }

        this.switch();
    }

    render() {
        const { submitText, showEditIcon, value } = this.props;

        return (
            <Container>
                <InputBox show={this.state.show}>
                    <textarea
                        type="text"
                        onKeyDown={this.onKeyDown}
                        onChange={this.onChange}
                        value={this.state.value}
                        ref={input => input && input.focus()}
                        style={this.state.inputStyles}
                    />

                    <SpanBlock>
                        <Button onClick={this.submit}>
                            {submitText || ' apply'}
                        </Button>
                        <Cancel onClick={this.switch}>
                            ✕
                        </Cancel>
                    </SpanBlock>
                </InputBox>

                <Label onClick={this.switch} className="r-ie">
                    {value}

                    {
                        showEditIcon &&
                        <div className="edit-icon">✎</div>
                    }
                </Label>
            </Container>
        );
    }
}

InlineEditable.propTypes = {
    /** Main value */
    value: PropTypes.string.isRequired,
    /** Process function when the text is submit */
    onSubmit: PropTypes.func.isRequired,
    /** Submit text for the input. Default is "apply". */
    submitText: PropTypes.string,
    /** Show edit indicator when the text is hovered */
    showEditIcon: PropTypes.bool,
};

export default InlineEditable;
