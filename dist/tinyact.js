'use strict';

const createElement = (tagName, props, children) => {
  const { style = {}, dataset = {}, ..._p } = props;
  const e = document.createElement(tagName);
  Object.entries(_p).map(([k, v]) => (e[k] = v));
  Object.entries(style).map(([k, v]) => (e.style[k] = v));
  Object.entries(dataset).map(([k, v]) => (e.dataset[k] = v));
  children.map(child => e.append(child()));
  return e;
};

const flattern = arr => [].concat.apply([], arr);
var h = (tagName, props = {}, ...c) => {
  const children = flattern(c).filter(Boolean);
  const render = ((element) => () => {
    if (element) return element;
    return (element = createElement(tagName, props, children))
  })();
  return Object.assign(render, { tagName, props, children })
};

const longZip = (a1, a2) => {
  const max = a1.length > a2.length ? a1 : a2;
  return max.map((_, i) => [a1[i], a2[i]]);
};

const patchProps = (prev, next) => {
  const e = prev();
  const { style: pStyle = {}, dataset: pData = {}, ...pProps } = prev.props;
  const { style: nStyle = {}, dataset: nData = {}, ...nProps } = next.props;
  Object.entries(pProps).map(([k]) => nProps[k] === undefined && (e[k] = undefined));
  Object.entries(nProps).map(([k, v]) => pProps[k] !== v && (e[k] = v));
  Object.entries(pStyle).map(([k]) => nStyle[k] === undefined && e.style.removeProperty(k));
  Object.entries(nStyle).map(([k, v]) => pStyle[k] !== v && (e.style[k] = v));
  Object.entries(pData).map(([k]) => nData[k] === undefined && Reflect.deleteProperty(e.dataset, k));
  Object.entries(nData).map(([k, v]) => pData[k] !== v && (e.dataset[k] = v));
};

const reconcile = (prev, next) => {
  patchProps(prev, next);
  const element = prev();
  const children = longZip(prev.children, next.children).map(([p, n]) =>
    p && !n ? p().remove()
      : !p && n ? (element.append(n()), n)
      : p.tagName !== n.tagName ? (p().replaceWith(n()), n)
      : reconcile(p, n)
  ).filter(Boolean);
  return Object.assign(prev, { props: next.props, children })
};

const realNode = (element, props = {}, ...children) => {
  return Object.assign(() => element, {
    tagName: element.tagName, props, children: children.filter(Boolean)
  });
};

const createMountPoint = root => {
  let prev = realNode(root);
  return (...children) =>
    (prev = reconcile(prev, realNode(root, {}, ...children)));
};

const app = ctx => {
  const dom = document.querySelector(ctx.node);
  const mount = createMountPoint(dom);
  const update = () => mount(ctx.render());
  Object.assign(ctx, {
    setState(state) {
      Object.assign(this.state, state);
      return update();
    }
  });
  return update();
};

exports.app = app;
exports.createMountPoint = createMountPoint;
exports.h = h;
//# sourceMappingURL=tinyact.js.map
