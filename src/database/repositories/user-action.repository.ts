import datasource from '../datasource';
import { UserActionEntity } from '../entities/user-actions.entity';

export const userActionRepository = datasource.getRepository(UserActionEntity).extend({
    getUserRatingsForClass(classId: number): Promise<UserActionEntity[]> {
        return datasource
            .getRepository(UserActionEntity)
            .createQueryBuilder('userAction')
            .where('userAction.class.id=:classId AND userAction.rate IS NOT NULL', {
                classId: classId,
            })
            .getMany();
    },
});
