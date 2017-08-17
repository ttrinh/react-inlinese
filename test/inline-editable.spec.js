import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import InlineEditable from '../src/index';
import { Container, InputBox, Label, Hint } from '../src/style';


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

describe('Inline Editable ', () => {
    const Wrapper = (props) => shallow(
        <InlineEditable
            value="basic text"
            onSubmit={() => {}}
            {...props}
        >
            test
        </InlineEditable>
    );

    it('it should not render without value and onSubmit', () => {
        const wrapper = shallow(<InlineEditable />);
        const wrapperNoValue = shallow(<InlineEditable onSubmit={() => {}} />);
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
        const Textarea = W.find('textarea');

        W.setState({ show: true });
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