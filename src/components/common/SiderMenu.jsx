import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;

/**
 * Component for cms sider nav menu
 */
class SiderMenu extends Component {
  /**
   * Get relevant url segment to identify
   * opened submenu by checking the url path
   * @param {string} path
   * @returns {array}
   */
  getMenuOpenKeysListBasedOnPath(path) {
    const pathArr = path.split('/');
    const result = pathArr.filter((value, index, array) => {
      return (index !== 0 && index < (array.length - 1)) ? value : null;
    });
    return result;
  }

  render() {
    const { location } = this.props;
    const section = this.getMenuOpenKeysListBasedOnPath(location.pathname);
    return (
      <Sider
        breakpoint="lg"
        collapsible
        width={240}
      >
        <div className="logo">
          Logo
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={section}
          mode="inline"
        >
          <Menu.Item key="/">
            <Link to="/">
              <Icon type="home" />
              <span>Dashboard</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="user"
            title={(
              <span>
                <Icon type="bars" />
                <span>Menu</span>
              </span>
            )}
          >
            <Menu.Item key="/menu/sub_menu/1">
              <Link to="/menu/sub_menu/1">
                <span>Sub Menu</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/menu/sub_menu/2">
              <Link to="/menu/sub_menu/2">
                <span>Sub Menu</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="/menu/sub_menu/sub_menu/3"
              title={<span><span>Sub Menu</span></span>}
            >
              <Menu.Item key="/menu/sub_menu/3">
                <Link to="/menu/sub_menu/3">
                  <span>Sub Menu</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/menu/sub_menu/4">
                <Link to="/menu/sub_menu/4">
                  <span>Sub Menu</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

SiderMenu.propTypes = {
  location: PropTypes.object,
};

export default withRouter(SiderMenu);
