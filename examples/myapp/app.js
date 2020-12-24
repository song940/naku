
export const createApp = ctx => {
  return props => {
    const dom = document.querySelector(ctx.node)
    const update = () => {
      dom.innerHTML = ctx.render.call(ctx);
      return dom;
    };
    Object.assign(ctx, {
      setState(state) {
        Object.assign(this.state, state);
        update();
        return this.state;
      }
    });
    update();
    ctx.onLoad && ctx.onLoad(props);
    for (const expr in ctx.events) {
      const [type, filter] = expr.split(',');
      const fn = ctx.events[expr];
      (filter ? dom.querySelector(filter) : dom).addEventListener(type, fn.bind(ctx));
    }
    return dom;
  };
};