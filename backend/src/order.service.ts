import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  create(entity: Order): Promise<Order> {
    return this.orderRepository.save(entity);
  }

  find(user: number): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['tour'],
      where: { user: { id: user } },
    });
  }
}