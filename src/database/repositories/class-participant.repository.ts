import datasource from '../datasource';
import { ClassParticipantEntity } from '../entities/class-participants.entity';

export const classParticipantsRepository = datasource.getRepository(ClassParticipantEntity).extend({
    findTotalNumberOfUserApplicationsOnClasses(userId: number): Promise<number> {
        return this.createQueryBuilder('classParticipant')
            .leftJoin('classParticipant.user', 'user')
            .where('user.id=:userId', { userId: userId })
            .getCount();
    },

    findTotalNumberOfUsersAppliedOnClass(classId: number): Promise<number> {
        return this.createQueryBuilder('classParticipant')
            .leftJoin('classParticipant.class', 'class')
            .where('class.id=:classId', { classId: classId })
            .getCount();
    },

    findClassParticipantByClassAndUser(userId: number, classId: number) {
        return this.createQueryBuilder('classParticipant')
            .leftJoin('classParticipant.class', 'class')
            .leftJoin('classParticipant.user', 'user')
            .where('classParticipant.class.id=:classId', { classId: classId })
            .andWhere(`classParticipant.user.id=:classId`, { userId: userId })
            .getOne();
    },
});
