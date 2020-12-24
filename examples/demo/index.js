'use strict';

import { h, createMountPoint } from '../../../dist/tinyact-esm.js';

const mount = createMountPoint(document.body);

const Page = ({ n = 0 }) => {
  const onclick = () => console.log(n);
  return h('div', {}, 
    h('h1', { textContent: `Timestamp: ${n}`, onclick })
  );
};

(function update(state) {

  mount(Page({ n: Date.now() }));

  setTimeout(update, 2000);

})();