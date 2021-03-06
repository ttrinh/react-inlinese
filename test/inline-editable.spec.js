import React from 'react';
import { shallow } from 'enzyme';
import { expect, assert } from 'chai';

import Buttons from '../src/Subs/Buttons';
import InlineEditable from '../src/index';
import { Container, InputBox, Label, Hint } from '../src/style';
import { calcInputBoxStyle, findParentByClass, getAutoGrowStyle } from '../src/helpers';


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


// no operation
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

    it('it should render the children in Label, and add "rie" class.', () => {
        const childrenBox = Wrapper().find(Label);
        expect(childrenBox).to.have.length(1);
        expect(childrenBox.hasClass('rie')).to.equal(true);
        expect(childrenBox.containsMatchingElement('test')).to.equal(true);
    });

    it('it should not render Edit Icon when showEditIcon disabled', () => {
        expect(Wrapper().find('.rie-edit-indicator')).to.have.length(1);
        const NoEditIcon = Wrapper({ showEditIcon: false });
        expect(NoEditIcon.find('.rie-edit-indicator')).to.have.length(0);
    });

    it('it should not render Buttons when showButtons set to false', () => {
        const W = Wrapper();
        W.setState({ show: true });
        expect(W.find(Buttons)).to.have.length(1);

        const NoButtons = Wrapper({ showButtons: false });
        NoButtons.setState({ show: true });
        expect(NoButtons.find(Buttons)).to.have.length(0);
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

    it('it should change state.show to show input box when the text is focused ', () => {
        const W = Wrapper();
        W.find(Label).simulate('focus');
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

    it('it should format text with user defined formatter', () => {
        // no dollar sign formatter
        const noDollarFormatter = value => value.match(/\$/)
            ? value.replace(/\$/g, '')
            : value;

        const W = Wrapper({
            formatter: noDollarFormatter,
        });
        W.setState({ show: true });
        const Textarea = W.find('textarea');
        Textarea.simulate('change', { target: { value: 'hello$' } });
        expect(W.state().value).to.equal('hello');
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

    it('it should pass down hoverStyleString, default or user-define', () => {
        const def = 'border-bottom: 1px dashed rgba(0,0,0,.2);';
        expect(Wrapper().instance().props.hoverStyleString).to.equal(def);
        const W = Wrapper({ hoverStyleString: 'color: white'}).instance();
        expect(W.props.hoverStyleString).to.equal('color: white');
    });

    it('it should pass down placeholder, default or user-define', () => {
        expect(Wrapper().instance().props.placeholder).to.equal('');
        const W = Wrapper({ placeholder: 'hello' }).instance();
        expect(W.props.placeholder).to.equal('hello');
    });

    it('it should, on disabled, set hoverStringStyle to "cursor: inherit;"', () => {
        const W = Wrapper({ disabled: true }).find(Label).shallow().instance();
        expect(W.props.hoverStyleString).to.equal('cursor: inherit;');
    });

    it('it should, on disabled, hide the edit icon indicator', () => {
        const W = Wrapper();
        expect(W.find('.rie-edit-indicator').length).to.equal(1);
        const W2 = Wrapper({ disabled: true });
        expect(W2.find('.rie-edit-indicator').length).to.equal(0);
    });

    it('it should, on disabled, not switch to the input box', () => {
        const W = Wrapper({ disabled: true });
        W.find(Label).simulate('click');
        expect(W.state().show).to.equal(false);
    });

});


describe('Box Helpers: calcInputBoxStyle', () => {
    // fake node
    const node = (w, h) => (function(){
        function Node() {
            this.offsetWidth = w || 10;
            this.offsetHeight = h || 10;
            this.children = [];
        }

        Node.prototype.getBoundingClientRect = () => ({
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: w,
            height: h,
        });

        return new Node();
    }());

    it('should return object', () => {
        assert.isObject(calcInputBoxStyle(node()));
    });

    it('should apply minWidth and minHeight', () => {
        const expected = { width: 300, height: 50 };
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

    it('should calculate autogrow height', () => {
        const newNode = node(300, 80);
        const currentStyle = {
            width: 100,
            height: 50,
        };
        const expected = { width: 100, height: 100 };
        expect(getAutoGrowStyle(newNode, currentStyle)).to.eql(expected);
    })

    it('should not calculate autogrow height when both node heights are equal', () => {
        const newNode = node(300, 50);
        const currentStyle = {
            width: 100,
            height: 50,
        };
        expect(getAutoGrowStyle(newNode, currentStyle)).to.eql(currentStyle);
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