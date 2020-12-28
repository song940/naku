import { createMountPoint } from './render';

export const app = ctx => {
  const dom = document.querySelector(ctx.node);
  const mount = createMountPoint(dom);
  const update = () => mount(ctx.render());
  Object.assign(ctx, {
    setState(state) {
      Object.assign(this.state, state);
      return update();
    }
  });
  ctx.onLoad && ctx.onLoad();
  return update();
};