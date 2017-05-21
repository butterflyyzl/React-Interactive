import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'scss/base.scss';
import 'scss/{{PageName}}/index.scss';
import MenuComp from 'components/MenuComp/MenuComp';

class PageComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  render () {
    return (
      <MenuComp activeTab={1}>
        <div>{{pagename}} Component to implement</div>
      </MenuComp>
    );
  }
}

ReactDOM.render(<PageComponent />, document.getElementById('app'));
