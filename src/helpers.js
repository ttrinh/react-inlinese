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
