import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'scss/base.scss';
import 'scss/SupplyBuy/index.scss';
import MenuComp from 'components/MenuComp/MenuComp';

class PageComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  render () {
    return (
      <MenuComp activeTab={3}>
        <div>supplybuy Component to implement</div>
      </MenuComp>
    );
  }
}

ReactDOM.render(<PageComponent />, document.getElementById('app'));
