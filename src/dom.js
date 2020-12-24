
export const createElement = (tagName, props, children) => {
  const { style = {}, dataset = {}, ..._p } = props;
  const e = document.createElement(tagName);
  Object.entries(_p).map(([k, v]) => (e[k] = v));
  Object.entries(style).map(([k, v]) => (e.style[k] = v));
  Object.entries(dataset).map(([k, v]) => (e.dataset[k] = v));
  children.map(child => e.append(child()));
  return e;
};