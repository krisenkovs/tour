import React from 'react';
import { Button, Col, Divider, Dropdown, Row } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { UserOutlined } from '@ant-design/icons';
import { store as loginDialogStore } from 'application/LoginDialog/store';
import { applicationStore } from 'application/store';

export const Header = observer(() => {
  const history = useHistory();

  function handleLoginClick() {
    loginDialogStore.show();
  }

  function handleAdminMenuClick(key: string) {
    if (key === 'logout') {
      applicationStore.logout();
    } else {
      history.push(key);
    }
  }

  return (
    <>
      <div style={{ padding: '16px 0' }}>
        <Row gutter={12}>
          <Col>
            <Link to="/hot">
              <Button type="link">Горящие путевки</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/tours">
              <Button type="link">Подбор тура</Button>
            </Link>
          </Col>
          <Col flex={1} />
          {!applicationStore.isLogin && (
            <Col>
              <Button type="link" onClick={handleLoginClick}>
                Войти как администратор
              </Button>
            </Col>
          )}
          {applicationStore.isLogin && (
            <Col>
              <Dropdown
                menu={{
                  items: [
                    { key: 'admin-countries', label: 'Страны' },
                    { key: 'admin-hotels', label: 'Отели' },
                    { key: 'admin-tours', label: 'Туры' },
                    { key: 'admin-orders', label: 'Заявки' },
                    { key: 'logout', label: 'Выйти' },
                  ],
                  onClick: ({ key }) => handleAdminMenuClick(key),
                }}
              >
                <Button type="text" icon={<UserOutlined />}>
                  Администратор
                </Button>
              </Dropdown>
            </Col>
          )}
        </Row>
      </div>
      <Divider />
    </>
  );
});
