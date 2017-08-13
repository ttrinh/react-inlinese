import React from 'react';
import PropTypes from 'prop-types';
import MdCreate from 'react-icons/lib/md/create';

import Buttons from './Subs/Buttons';
import { findParentByClass, calcInputBoxStyle } from './helpers';
import { Container, InputBox, Label, Hint } from './style';


/**
 * React component for editing text inline.
 * > * Note: Only support value as **string**
 */
class InlineEditable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || '',
            show: false,
            inputStyle: {},
            iconStyle: {},
        };
        this.switch = this.switch.bind(this);
        this.submit = this.submit.bind(this);
        this.hover = this.hover.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    onKeyDown(e) {
        if (e.keyCode === 13 && !e.shiftKey) this.submit(); // enter
        if (e.keyCode === 27) this.switch(); // escape
    }

    // calculate the input styles.
    setInputStyle(element) {
        if (this.state.show) return;
        const node = findParentByClass(element, 'r-ie');
        this.setState({
            inputStyle: calcInputBoxStyle(node),
        });
    }

    switch(e) {
        // when the label is clicked, so it includes event info
        if (e) {
            this.setInputStyle(e.target);
            this.setState({ value: this.props.value });
        }
        this.setState({ show: !this.state.show });
    }

    submit() {
        const value = this.state.value.trim();
        this.props.onSubmit(value);
        this.switch();
    }

    hover(e) {
        const node = e.target;
        const height = node.offsetHeight;
        if (!height) return;

        this.setState({
            iconStyle: {
                top: height - 22,
            },
        });
    }

    render() {
        const {
            submitText, showEditIcon, children,
            primaryColor, secondaryColor, roundness,
        } = this.props;

        return (
            <Container onMouseEnter={this.hover}>
                <InputBox
                    show={this.state.show}
                    color={primaryColor}
                    roundness={roundness}
                >
                    {
                        this.state.show &&
                        <textarea
                            type="text"
                            onKeyDown={this.onKeyDown}
                            onChange={this.onChange}
                            value={this.state.value}
                            ref={input => input && input.focus()}
                            style={this.state.inputStyle}
                        />
                    }

                    <Hint color={primaryColor}>
                        <b>Enter</b>: Apply, <b>Esc</b>: Cancel
                    </Hint>

                    <Buttons
                        submit={this.submit}
                        cancel={this.switch}
                        bgColor={primaryColor}
                        textColor={secondaryColor}
                        submitText={submitText}
                        roundness={roundness}
                    />
                </InputBox>

                <Label onClick={this.switch} className="r-ie">
                    {children}
                </Label>

                { showEditIcon !== false &&
                    <span
                        className="edit-indicator"
                        style={this.state.iconStyle}
                    >
                        <MdCreate size={14} />
                    </span>
                }
            </Container>
        );
    }
}

InlineEditable.propTypes = {

    /** Main value */
    value: PropTypes.string.isRequired,

    /** Process function when the text is submit */
    onSubmit: PropTypes.func.isRequired,

    /** primary color. */
    primaryColor: PropTypes.string,

    /** secondary color. Used for the buttons' text color */
    secondaryColor: PropTypes.string,

    /** overal roundness, border-radius */
    roundness: PropTypes.string,

    /** Submit text for the input. */
    submitText: PropTypes.string,

    /** Show edit indicator when the text is hovered. */
    showEditIcon: PropTypes.bool,

    /** Children component */
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]),
};

InlineEditable.defaultProps = {
    submitText: 'apply',
    showEditIcon: true,
    primaryColor: '#555',
    roundness: '3px',
};

export default InlineEditable;
