import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'scss/base.scss';
import 'scss/Statements/index.scss';
import MenuComp from 'components/MenuComp/MenuComp';

class PageComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  render () {
    return (
      <MenuComp activeTab={1}>
        <div>statements Component to implement</div>
      </MenuComp>
    );
  }
}

ReactDOM.render(<PageComponent />, document.getElementById('app'));
