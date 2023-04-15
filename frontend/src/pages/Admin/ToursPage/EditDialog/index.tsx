import React, { useEffect } from 'react';
import { Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, Switch } from 'antd';
import { store } from './store';
import { store as tableStore } from '../store';
import { observer } from 'mobx-react';
import { useObserveError, useObserveSuccess } from 'helpers';
import { DateInput } from 'pages/Admin/ToursPage/EditDialog/DateInput';

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
          label="Отель"
          name={['hotel', 'id']}
          rules={[{ required: true, message: 'Укажите страну' }]}
          style={{ width: '100%' }}
        >
          <Select
            loading={store.hotelsPromise?.pending}
            options={store.hotelsPromise?.value?.map((item) => ({
              key: item?.id,
              value: item?.id,
              label: item?.name,
            }))}
          />
        </Form.Item>
        <Form.Item label="Дата" name="date" rules={[{ required: true, message: 'Заполните поле' }]}>
          <DateInput />
        </Form.Item>
        <Form.Item
          label="Максимально человек"
          name="mens"
          rules={[{ required: true, message: 'Заполните поле' }]}
          style={{ width: '100%' }}
        >
          <InputNumber min={0} max={12} precision={0} step={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Цена" name="price" rules={[{ required: true, message: 'Заполните поле' }]}>
          <InputNumber min={0} max={9999999999} precision={0} step={1} style={{ width: '100%' }} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Признак активности" name="active" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Горящий" name="hot" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});
