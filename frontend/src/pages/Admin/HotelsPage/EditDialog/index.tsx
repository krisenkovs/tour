import React, { useEffect } from 'react';
import { Col, Form, Input, Modal, Rate, Row, Select, Switch } from 'antd';
import { store } from './store';
import { store as tableStore } from '../store';
import { observer } from 'mobx-react';
import { useObserveError, useObserveSuccess } from 'helpers';

export const EditDialog = observer(() => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (store.visible) {
      store.loadCountries();
      form.setFieldsValue(store.data);
    }
    return () => form.resetFields();
  }, [store.visible]);

  useObserveSuccess(store.savePromise, () => {
    store.close();
    tableStore.load();
  });
  useObserveError(store.savePromise);

  function handleFinish() {
    form.validateFields().then(() => {
      const values = form.getFieldsValue(true);
      if (values?.id) {
        store.save(values);
      } else {
        store.create(values);
      }
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
      title={store.data ? 'Редактирование' : 'Добавление'}
      okText="Сохранить"
      cancelText="Отмена"
      onOk={handleFinish}
      width={400}
      onCancel={handleCancel}
      okButtonProps={{ loading: store.savePromise?.pending }}
      cancelButtonProps={{ disabled: store.savePromise?.pending }}
    >
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item
          label="Страна"
          name={['country', 'id']}
          rules={[{ required: true, message: 'Укажите страну' }]}
          style={{ width: '100%' }}
        >
          <Select
            loading={store.countriesPromise?.pending}
            options={store.countriesPromise?.value?.map((item) => ({
              key: item?.id,
              value: item?.id,
              label: item?.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Наименование"
          name="name"
          rules={[{ required: true, message: 'Укажите наименование' }]}
          style={{ width: '100%' }}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Ссылка на картинку" name="image" style={{ width: '100%' }}>
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Признак активности" name="active" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Звезд" name="rate">
              <Rate />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});
