import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Button, Col, Row, Table, Tooltip, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { store as editDialogStore } from 'pages/Admin/CountriesPage/EditDialog/store';
import { EditDialog } from 'pages/Admin/CountriesPage/EditDialog';
import { store } from './store';
import { useObserveError, useObserveSuccess } from 'helpers';

export const CountriesPage = observer(() => {
  useEffect(() => {
    store.load();
  }, []);

  useObserveSuccess(store.savePromise, () => {
    store.load();
  });
  useObserveError(store.savePromise);

  return (
    <>
      <div style={{ flex: 1, flexDirection: 'column', padding: '16px', display: 'flex' }}>
        <Row align="middle">
          <Col flex={1}>
            <Typography.Title level={2}>Справочник стран</Typography.Title>
          </Col>
          <Col>
            <Button type="primary" onClick={() => editDialogStore.show()}>
              Добавить страну
            </Button>
          </Col>
        </Row>
        <Table
          size="small"
          rowKey="id"
          loading={store.itemsPromise?.pending}
          dataSource={store.itemsPromise?.value}
          showSorterTooltip={false}
          pagination={false}
          columns={[
            {
              title: 'id',
              dataIndex: 'id',
              key: 'id',
              defaultSortOrder: 'descend',
              width: 90,
            },
            {
              title: 'Наименование',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Активна',
              key: 'active',
              width: 120,
              render: (value, record) => (record.active ? 'Да' : 'Нет'),
            },

            {
              key: 'actions',
              align: 'right',
              width: 90,
              render: (value, record) => (
                <Row justify="center" gutter={8}>
                  <Col>
                    <Tooltip title="Редактировать">
                      <Button
                        type="ghost"
                        size="small"
                        icon={<EditOutlined />}
                        color=""
                        onClick={() => editDialogStore.show(record)}
                      />
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip title="Удалить">
                      <Button
                        type="ghost"
                        size="small"
                        icon={<DeleteOutlined />}
                        danger
                        loading={store.savePromise?.pending}
                        onClick={() => store.delete(record?.id)}
                      />
                    </Tooltip>
                  </Col>
                </Row>
              ),
            },
          ]}
        />
      </div>
      <EditDialog />
    </>
  );
});
