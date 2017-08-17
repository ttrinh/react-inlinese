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
* @param {Node} node     the text label element
* @return {Objet}
**/
export const calcInputBoxStyle = (node) => {
    const minWidth = 200;
    const minHeight = 50;
    const padding = 10;
    const extraSpace = 10;

    const w = node.offsetWidth + (padding * 2) + extraSpace;
    const h = node.offsetHeight + (padding * 2) + (extraSpace * 2);
    const width = w < minWidth ? minWidth : w;
    const height = h < minHeight ? minHeight : h;

    return {
        width,
        height,
    };
};

