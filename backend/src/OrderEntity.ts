import { EntitySchema } from 'typeorm';

export const OrderEntity = new EntitySchema<any>({
	name: 'orders',
	columns: {
		id: {
			type: Number,
			primary: true,
			generated: true,
		},
		phone: {
			type: String,
			nullable: true,
		},
		comment: {
			type: String,
			nullable: true,
		},
		mens: {
			type: Number,
			nullable: true,
		},
		check: {
			type: Boolean,
			default: false,
		},
	},
	relations: {
		tour: {
			type: 'many-to-one',
			target: 'tours',
			joinColumn: {
				name: 'tour_id',
			},
			eager: true,
		},
	},
});
