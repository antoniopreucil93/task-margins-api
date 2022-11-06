import datasource from '../datasource';

import { SportEntity } from '../entities/sport.entity';

export const sportRepository = datasource.getRepository(SportEntity).extend({
    findSportById(sportId: number): Promise<SportEntity> {
        return datasource
            .getRepository(SportEntity)
            .createQueryBuilder('sport')
            .where('sport.id=:sportId', { sportId: sportId })
            .getOne();
    },
});
