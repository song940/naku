
const longZip = (a1, a2) => {
  const max = a1.length > a2.length ? a1 : a2;
  return max.map((_, i) => [a1[i], a2[i]]);
};

export const patchProps = (prev, next) => {
  const e = prev()
  const { style: pStyle = {}, dataset: pData = {}, ...pProps } = prev.props
  const { style: nStyle = {}, dataset: nData = {}, ...nProps } = next.props
  Object.entries(pProps).map(([k]) => nProps[k] === undefined && (e[k] = undefined))
  Object.entries(nProps).map(([k, v]) => pProps[k] !== v && (e[k] = v))
  Object.entries(pStyle).map(([k]) => nStyle[k] === undefined && e.style.removeProperty(k))
  Object.entries(nStyle).map(([k, v]) => pStyle[k] !== v && (e.style[k] = v))
  Object.entries(pData).map(([k]) => nData[k] === undefined && Reflect.deleteProperty(e.dataset, k))
  Object.entries(nData).map(([k, v]) => pData[k] !== v && (e.dataset[k] = v))
}

export const reconcile = (prev, next) => {
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