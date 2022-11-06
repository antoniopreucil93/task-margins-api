import datasource from '../datasource';

import { Adulthood } from '../../enum';
import { ClassEntity } from '../entities/class.entity';

export const classRepository = datasource.getRepository(ClassEntity).extend({
    findClassById(classId: number): Promise<ClassEntity> {
        return datasource
            .getRepository(ClassEntity)
            .createQueryBuilder('class')
            .where('class.id=:classId', { classId: classId })
            .getOne();
    },
    getClassesFilteredBySportAndAge(sports: any, age: Adulthood): Promise<ClassEntity[]> {
        let queryBuilder = datasource
            .getRepository(ClassEntity)
            .createQueryBuilder('classes')
            .select([
                'classes.id',
                'classes.weekSchedule',
                'classes.classDuration',
                'classes.maxNumberOfParticipants',
            ]);
        if (sports) {
            const sportNames = sports.split(',');
            queryBuilder
                .leftJoin('classes.sport', 'sport')
                .where(`sport.name IN (:...sportNames)`, { sportNames: sportNames });
        }

        if (age) queryBuilder.andWhere(`classes.age_level = '${age}'`);

        return queryBuilder.getMany();
    },
});
