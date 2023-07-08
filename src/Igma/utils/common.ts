export const clearDOMNode = (node: HTMLElement | SVGSVGElement): void => {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
};