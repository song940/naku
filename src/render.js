import { reconcile } from './reconciler';

const realNode = (element, props = {}, ...children) => {
  return Object.assign(() => element, {
    tagName: element.tagName, props, children: children.filter(Boolean)
  });
};

export const createMountPoint = root => {
  let prev = realNode(root);
  return (...children) =>
    (prev = reconcile(prev, realNode(root, {}, ...children)));
};
