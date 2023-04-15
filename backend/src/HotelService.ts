import { HotelEntity } from './HotelEntity';
import { AppDataSource } from './DataSource';

type HotelType = { name: string; active: boolean; countryId: number; rate: number; image: string };

export class HotelService {
  async get(): Promise<HotelType[]> {
    return AppDataSource.manager.find(HotelEntity);
  }

  async create(entity: HotelType): Promise<void> {
    AppDataSource.manager.insert(HotelEntity, entity);
  }

  async save(id?: number | string, entity?: HotelType): Promise<void> {
    entity && AppDataSource.manager.update(HotelEntity, { id }, entity);
  }

  async delete(id?: string): Promise<void> {
    AppDataSource.manager.delete(HotelEntity, id);
  }
}
