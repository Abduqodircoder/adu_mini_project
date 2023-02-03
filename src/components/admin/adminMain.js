import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import React, {useState} from 'react';
import { Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;



function AdminMain(props) {

    const [collapsed, setCollapsed] = useState(false);
    const {token: { colorBgContainer }} = theme.useToken();
    const [items, setItems] = useState([
        {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1',
        },
        {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2',
        },
        {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
        },
    ])

        const selectMenu = (value) =>{
            console.log(value.key)
        }

    return (
        <>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" />
                    <Menu
                        theme="dark" mode="inline"
                        defaultSelectedKeys={['1']} items={items}
                        onClick={selectMenu}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header style={{padding: 0, background: colorBgContainer,}}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </Header>
                    <Content style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: "88.5vh",
                            background: colorBgContainer,
                        }}>
                        Content
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export default AdminMain;