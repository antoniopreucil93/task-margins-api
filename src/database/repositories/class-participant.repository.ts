import datasource from '../datasource';
import { ClassParticipantEntity } from '../entities/class-participants.entity';

export const classParticipantsRepository = datasource.getRepository(ClassParticipantEntity).extend({
    findTotalNumberOfUserApplicationsOnClasses(userId: number): Promise<number> {
        return this.createQueryBuilder('classParticipation')
            .leftJoin('classParticipation.user', 'user')
            .where('user.id=:userId', { userId: userId })
            .getCount();
    },

    findTotalNumberOfUsersAppliedOnClass(classId: number): Promise<number> {
        return this.createQueryBuilder('classParticipation')
            .leftJoin('classParticipation.class', 'class')
            .where('class.id=:classId', { classId: classId })
            .getCount();
    },
});
