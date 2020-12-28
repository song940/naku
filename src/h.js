import { createElement } from './dom';

const flattern = arr => [].concat.apply([], arr);

export const h = (tagName, props = {}, ...c) => {
  const children = flattern(c).filter(Boolean);
  const render = ((element) => () => {
    if (element) return element;
    return (element = createElement(tagName, props, children))
  })();
  return Object.assign(render, { tagName, props, children })
};

export const div = (props, children) => {
  return h('div', props, children);
};

export const h1 = (props, children) => {
  return h('h1', props, children);
};

export const span = (props, children) => {
  return h('span', props, children);
};

export const strong = (props, children) => {
  return h('strong', props, children);
};