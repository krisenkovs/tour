import { AppDataSource } from './DataSource';
import { OrderEntity } from './OrderEntity';

type OrderType = { tourId: string; mens: number; comment: string; phone: string };

export class OrderService {
  async check(id?: string): Promise<void> {
    await AppDataSource.manager.update(OrderEntity, { id }, { check: true });
  }

  async get(): Promise<OrderType[]> {
    return AppDataSource.manager.find(OrderEntity, { order: { id: 'DESC' } });
  }

  async create(entity: OrderType): Promise<void> {
    AppDataSource.manager.insert(OrderEntity, entity);
  }
}
