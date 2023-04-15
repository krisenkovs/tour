import { CountryEntity } from './CountryEntity';
import { AppDataSource } from './DataSource';

export class CountryService {
  async get(): Promise<any> {
    return await AppDataSource.manager.find(CountryEntity);
  }

  async create(entity: { name: string; active: boolean }): Promise<any> {
    const { name, active } = entity;
    return await AppDataSource.manager.insert(CountryEntity, { name, active });
  }

  async save(id: number | string, entity: { name: string; active: boolean }): Promise<any> {
    const { name, active } = entity;
    return await AppDataSource.manager.update(CountryEntity, { id }, { name, active });
  }

  async delete(id?: string): Promise<void> {
    AppDataSource.manager.delete(CountryEntity, id);
  }
}
