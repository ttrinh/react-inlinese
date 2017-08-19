/**
* Find parent by className
*
* @param {Node} element     child element
* @param {String} className parent className to match
* @return {Node}            parent node or itself that has the class
**/
export const findParentByClass = (element, className) => (
    (element.className.split(' ').indexOf(className) >= 0)
    ? element
    : element.parentNode && findParentByClass(element.parentNode, className)
);


/**
* Calculate width and height of the input box
* based on width and height of the label text
*
* @param {Node}     node        the text label element
* @param {Object}   config      { padding, extraSpace, minWidth, minHeight }
* @return {Object}              { width, height }
**/
const defaultConfig = {
    padding: 10,
    extraSpace: 10,
    minWidth: 300,
    minHeight: 50,
};
export const calcInputBoxStyle = (node, config = defaultConfig) => {
    const { padding, extraSpace, minWidth, minHeight } = config;

    // The box should includes side paddings and extra space
    // vertical bottom padding should extend because the buttons & descriptions
    const sidePadding = padding * 2;
    const verticalExtra = extraSpace * 2;
    const w = node.offsetWidth + sidePadding + extraSpace;
    const h = node.offsetHeight + sidePadding + verticalExtra;

    // compare it against minimum values
    const width = w < minWidth ? minWidth : w;
    const height = h < minHeight ? minHeight : h;

    return {
        width,
        height,
    };
};

