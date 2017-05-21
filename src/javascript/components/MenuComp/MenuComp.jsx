import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UrlUtil from 'extend/common/UrlUtil';
import pageList from 'data/pageList.json';
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class MenuComp extends Component {
  constructor (props) {
    super(props);

    this.state = {
      showMenu: true,
    };

    this.showMenu = this.showMenu.bind(this);
  }

  showMenu () {
    let { showMenu } = this.state;
    this.setState({
      showMenu: !showMenu,
    });
  }

  handleMenuClick ({ item, key, selectedKeys }) {
    console.log(pageList.pages[key - 1]);
    location.href = UrlUtil.getPageUrlByPageName(pageList.pages[key - 1].name);
  }

  render () {
    let { children, activeTab } = this.props;
    let { showMenu } = this.state;
    let { key: activeTabKey, subKey: activeTabSubkey } = pageList.pages[activeTab - 1].index;

    return (
      <Layout style={{ height: '100vh' }}>
        <Header className='header' style={{ position: 'fixed', width: '100%' }}>
          <div
            className='logo'
            style={{
              width: '60px',
              height: '60px',
              lineHeight: '60px',
              display: 'inline-block',
              // backgroundImage: 'url(../../res/images/Test/logo.png)',
              verticalAlign: 'middle',
            }}
          >FIX ME!</div>
          <div
            className='title'
            style={{ display: 'inline-block', color: '#fff', fontSize: '20px' }}
          >| 极配透明报表系统</div>
        </Header>
        <Layout style={{ marginTop: 64 }}>
          <Sider mode='inline' width={showMenu ? 200 : 0} style={{ background: '#404040', position: 'relative' }}>
            <div
              className='menu-bar'
              onClick={this.showMenu}
              style={{
                position: 'absolute',
                right: -15,
                height: 80,
                backgroundColor: '#404040',
                borderTop: '15px solid #ececec',
                borderLeft: '15px solid #404040',
                borderBottom: '15px solid #ececec',
                cursor: 'pointer',
              }} />
            <Menu
              theme='dark'
              mode='inline'
              defaultSelectedKeys={[activeTabKey]}
              defaultOpenKeys={[activeTabSubkey]}
              style={{ height: '100%' }}
              onSelect={this.handleMenuClick}
            >
              <SubMenu key='sub1' title={<span><Icon type='user' />收支报表</span>}>
                <Menu.Item key='1'>收支报表</Menu.Item>
              </SubMenu>
              <SubMenu key='sub2' title={<span><Icon type='laptop' />收入数据</span>}>
                <Menu.Item key='2'>收入数据</Menu.Item>
              </SubMenu>
              <SubMenu key='sub3' title={<span><Icon type='notification' />支出数据</span>}>
                <Menu.Item key='3'>物资采购</Menu.Item>
                <Menu.Item key='4'>物资使用</Menu.Item>
                <Menu.Item key='5'>其他支出</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px' }}>
            <Content style={{ background: '#ececec', padding: 0, margin: 0, minHeight: 280 }}>
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

MenuComp.propTypes = {
  children: PropTypes.element.isRequired,
  activeTab: PropTypes.number.isRequired,
};
