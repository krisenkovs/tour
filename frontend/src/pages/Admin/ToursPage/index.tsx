import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Button, Col, Row, Table, Tooltip, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { store as editDialogStore } from './EditDialog/store';
import { EditDialog } from './EditDialog';
import { store } from './store';
import { useObserveError, useObserveSuccess } from 'helpers';
import moment from 'moment';

export const ToursPage = observer(() => {
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
            <Typography.Title level={2}>Справочник туров</Typography.Title>
          </Col>
          <Col>
            <Button type="primary" onClick={() => editDialogStore.show()}>
              Добавить тур
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
              title: 'Страна',
              //dataIndex: 'country',
              key: 'country',
              width: 130,
              render: (value, record: any) => value?.hotel?.country?.name,
            },
            {
              title: 'Отель',
              //dataIndex: 'country',
              key: 'hotel',
              render: (value, record: any) => value?.hotel?.name,
            },
            {
              title: 'Дата',
              dataIndex: 'date',
              key: 'date',
              width: 100,
              render: (value, record: any) => moment(value).format('DD.MM.YYYY'),
            },
            {
              title: 'Максимально человек',
              dataIndex: 'mens',
              key: 'mens',
              width: 90,
            },
            {
              title: 'Горящий',
              key: 'hot',
              width: 90,
              render: (value, record) => (record.hot ? 'Да' : 'Нет'),
            },
            {
              title: 'Стоимость',
              dataIndex: 'price',
              key: 'price',
              width: 80,
            },
            {
              title: 'Активен',
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
