import datasource from '../datasource';

import { UserEntity } from '../entities/user.entity';

export const userRepository = datasource.getRepository(UserEntity).extend({
    findUserById(userId: number): Promise<UserEntity> {
        return datasource
            .getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.id=:userId', { userId: userId })
            .getOne();
    },
});
