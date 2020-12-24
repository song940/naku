import { createElement } from './dom';

const flattern = arr => [].concat.apply([], arr);
export default (tagName, props = {}, ...c) => {
  const children = flattern(c).filter(Boolean);
  const render = ((element) => () => {
    if (element) return element;
    return (element = createElement(tagName, props, children))
  })();
  return Object.assign(render, { tagName, props, children })
};