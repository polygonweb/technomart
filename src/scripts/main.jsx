import 'svgxuse/svgxuse.js';

import React from 'react';
import { render } from 'react-dom';

import Greetings from 'greetings';

if (module.hot) {
  module.hot.accept();
}

const App = () => {
  return (
    <div className='app'>
      <Greetings name='John'/>
    </div>
  )
};

render(<App />, document.getElementById('app'))
