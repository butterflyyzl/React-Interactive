import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { StringUtil } from '@xinguang/common-tool';
import 'scss/base.scss';
import 'scss/Test/index.scss';
import MenuComp from 'components/MenuComp/MenuComp';

class PageComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  render () {
    return (
      <MenuComp activeTab={1}>
        <div>clsj</div>
      </MenuComp>
    );
  }
}

ReactDOM.render(<PageComponent />, document.getElementById('app'));
