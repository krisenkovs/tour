import { AppDataSource } from './DataSource';
import { TourEntity } from './TourEntity';
import { MoreThan } from 'typeorm';

type TourType = { date: string; mens: number; hotelId: number; active: boolean; hot: boolean; price: number };

export class TourService {
  constructor() {}

  async find(filter: { countryId?: string; date?: number; mens?: number; hot?: boolean }): Promise<any> {
    return AppDataSource.manager.find(TourEntity, {
      where: [
        {
          hotel: {
            country: {
              active: true,
              id: filter.countryId,
            },
            active: true,
          },
          date: filter.date,
          hot: filter.hot,
          mens: MoreThan(filter?.mens),
        },
      ],
      //relations: ['hotel', 'hotel.country'],
      //loadRelationIds: true,
    });
    /*const result = await this.db
      .query(`select t.*,json_build_object('id',h.id,'name',h.name,'country',to_json(c.*)) hotel
        from tours t
        join hotels h on h.id = t.hotel_id
        join countries c on c.id = h.country_id
        where t.active = true
            and h.active=true
            and c.active=true
            ${filter?.countryId ? `and c.id=${filter?.countryId}` : ''}
            ${filter?.date ? `and t.date=${filter?.date}` : ''}
            ${filter?.mens ? `and t.mens>=${filter?.mens}` : ''}
            ${filter?.hot ? `and t.hot=true` : ''}
            `);
    return result?.rows;*/
  }

  async get(): Promise<any> {
    return AppDataSource.manager.find(TourEntity);
  }

  async create(entity: TourType): Promise<void> {
    AppDataSource.manager.insert(TourEntity, entity);
  }

  async save(id?: number | string, entity?: TourType): Promise<void> {
    entity && AppDataSource.manager.update(TourEntity, { id }, entity);
  }

  async delete(id?: string): Promise<void> {
    AppDataSource.manager.delete(TourEntity, { id });
  }
}
