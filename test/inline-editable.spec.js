import React from 'react';
import { shallow } from 'enzyme';
import { expect, assert } from 'chai';

import Buttons from '../src/Subs/Buttons';
import InlineEditable from '../src/index';
import { Container, InputBox, Label, Hint } from '../src/style';
import { calcInputBoxStyle, findParentByClass } from '../src/helpers';


// generate fake key event
const pressKeyEvent = (keyCode) => ({
    keyCode,
    target: {
        value: String.fromCharCode(
            (96 <= keyCode && keyCode <= 105)
                ? keyCode - 48
                : keyCode
        ),
    },
});

const noop = () => {};

describe('Inline Editable ', () => {
    const Wrapper = (props, children = 'test') => shallow(
        <InlineEditable value="basic text" onSubmit={noop} {...props}>
            {children}
        </InlineEditable>
    );

    it('it should not render without value and onSubmit', () => {
        const wrapper = shallow(<InlineEditable />);
        const wrapperNoValue = shallow(<InlineEditable onSubmit={noop} />);
        const wrapperNoSubmit = shallow(<InlineEditable value="one" />);

        expect(wrapper.children()).to.have.length(0);
        expect(wrapperNoValue.children()).to.have.length(0);
        expect(wrapperNoSubmit.children()).to.have.length(0);
    });

    it('it should render with value and onSubmit', () => {
        expect(Wrapper().children()).to.have.length(3);
    });

    it('it should assign "value" in state based off of value prop', () => {
        expect(Wrapper().state().value).to.equal('basic text');
    });

    it('it should render the children in Label, and add "r-ie" class.', () => {
        const childrenBox = Wrapper().find(Label);
        expect(childrenBox).to.have.length(1);
        expect(childrenBox.hasClass('r-ie')).to.equal(true);
        expect(childrenBox.containsMatchingElement('test')).to.equal(true);
    });

    it('it should not render Edit Icon when showEditIcon disabled', () => {
        const NoEditIcon = Wrapper({ showEditIcon: false });
        expect(NoEditIcon.find('.edit-indicator')).to.have.length(0);
    });

    it('it should calculate icon top position when text is hovered ', () => {
        const W = Wrapper();
        W.find(Label).simulate('mouseenter', { target: { offsetHeight: 50 }});
        expect(W.state().iconStyle.top).to.equal(28);
    });

    it('it should change state.show to show input box when the text is clicked ', () => {
        const W = Wrapper();
        W.find(Label).simulate('click');
        expect(W.state().show).to.equal(true);
    });

    it('it should show the input box by adding "rie-show" class', () => {
        const W = Wrapper();
        W.find(Label).simulate('click');
        expect(W.find(InputBox).hasClass('rie-show')).to.equal(true);
    });

    it('it should change value when type', () => {
        const W = Wrapper();
        W.setState({ show: true });
        const Textarea = W.find('textarea');
        Textarea.simulate('change', { target: { value: 'hello friends' } });
        expect(W.state().value).to.equal('hello friends');
    });

    it('it should submit value on Enter', () => {
        const W = Wrapper();
        W.setState({ show: true });
        const Textarea = W.find('textarea');

        Textarea.simulate('change', { target: { value: 'hello friends' } });
        Textarea.simulate('keyDown', pressKeyEvent(13));
        expect(W.state().value).to.equal('hello friends');
        expect(W.state().show).to.equal(false);
    });

    it('it should reset value on Esc or Tab', () => {
        const W = Wrapper();
        W.setState({ show: true });
        const Textarea = W.find('textarea');

        Textarea.simulate('change', { target: { value: 'hello friends' } });
        Textarea.simulate('keyDown', pressKeyEvent(27));
        expect(W.state().value).to.equal('basic text');
        expect(W.state().show).to.equal(false);

        W.setState({ show: true });
        Textarea.simulate('change', { target: { value: 'hello friends' } });
        Textarea.simulate('keyDown', pressKeyEvent(9));
        expect(W.state().value).to.equal('basic text');
        expect(W.state().show).to.equal(false);
    });

    it('it should trim value on submit', () => {
        const W = Wrapper();
        W.setState({ show: true });
        const Textarea = W.find('textarea');

        Textarea.simulate('change', { target: { value: '   hello friends    ' } });
        Textarea.simulate('keyDown', pressKeyEvent(13));
        expect(W.state().value).to.equal('hello friends');
    });

});


describe('Box Helpers: calcInputBoxStyle', () => {
    const node = (w, h) => ({
        offsetWidth: w || 10,
        offsetHeight: h || 10,
    });

    it('should return object', () => {
        assert.isObject(calcInputBoxStyle(node()));
    });

    it('should apply minWidth and minHeight', () => {
        const expected = { width: 200, height: 50 };
        expect(calcInputBoxStyle(node())).to.eql(expected);
    })

    it('should calculate width and height', () => {
        const newNode = node(300, 50);
        const expected = { width: 330, height: 90 };
        expect(calcInputBoxStyle(newNode)).to.eql(expected);
    })

    it('should calculate with a defined config', () => {
        const newNode = node(300, 50);
        const expected = { width: 390, height: 190 };
        const config = {
            padding: 20,
            extraSpace: 50,
            minWidth: 200,
            minHeight: 50,
        };
        expect(calcInputBoxStyle(newNode, config)).to.eql(expected);
    })
});


describe('Buttons', () => {
    const buttons = props => shallow(
        <Buttons submit={noop} cancel={noop} {...props}/>
    );

    it('should render default values', () => {
        const B = buttons();
        expect(B.props().bgColor).to.equal('#555');
        expect(B.props().textColor).to.equal('white');
        expect(B.props().roundness).to.equal('3px');
        expect(B.containsMatchingElement('submit')).to.equal(true);
        expect(B.containsMatchingElement('cancel')).to.equal(true);
    });

    it('should render defined values', () => {
        const B = buttons({
            submitText: 'Taco',
            cancelText: 'Kitty',
            bgColor: 'yellow',
            textColor: 'red',
            roundness: '0'
        });
        expect(B.props().bgColor).to.equal('yellow');
        expect(B.props().textColor).to.equal('red');
        expect(B.props().roundness).to.equal('0');
        expect(B.containsMatchingElement('Taco')).to.equal(true);
        expect(B.containsMatchingElement('Kitty')).to.equal(true);
    });

});