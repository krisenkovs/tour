import React from 'react';
import { Form, Input, Modal } from 'antd';
import { store } from 'application/LoginDialog/store';
import { observer } from 'mobx-react';
import { applicationStore } from 'application/store';
import { useObserveError, useObserveSuccess } from 'helpers';

export const LoginDialog = observer(() => {
  const [form] = Form.useForm();

  useObserveSuccess(store.loginPromise, () => {
    applicationStore.setLoginToken(store?.loginPromise?.value?.token || '');
    store.close();
  });
  useObserveError(store.loginPromise);

  function handleFinish() {
    form.validateFields().then((values) => {
      store.login(values);
    });
  }
  function handleCancel() {
    store.close();
  }
  return (
    <Modal
      centered
      maskClosable={false}
      open={store.visible}
      forceRender
      title="Администратор"
      okText="войти"
      cancelText="отмена"
      onOk={handleFinish}
      width={400}
      onCancel={handleCancel}
      okButtonProps={{ loading: store.loginPromise?.pending }}
      cancelButtonProps={{ disabled: store.loginPromise?.pending }}
    >
      <Form form={form} layout="vertical" initialValues={{ remember: true }} autoComplete="off">
        <Form.Item label="Логин" name="login" rules={[{ required: true, message: 'Укажите логин' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Укажите пароль' }]}>
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
});
