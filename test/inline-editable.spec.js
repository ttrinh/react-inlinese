import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import InlineEditable from '../src/index';
import { Container, InputBox, Label, Hint } from '../src/style';


describe('Inline Editable ', () => {
    const Wrapper = (props) => shallow(
        <InlineEditable
            value="standard"
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
        expect(Wrapper().state().value).to.equal('standard');
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

    it('it should set icon top position when text is hovered ', () => {
        const W = mount(
            <InlineEditable
                value="standard"
                onSubmit={() => {}}
            >
                test
            </InlineEditable>
        );
        W.find(Label).simulate('mouseenter');
        expect(W.state().iconStyle.top).to.equal('inherit');
    });

    it('it should change state.show to show input box when the text is clicked ', () => {
        const W = Wrapper();
        W.find(Label).simulate('click');
        expect(W.state().show).to.equal(true);
    });

});