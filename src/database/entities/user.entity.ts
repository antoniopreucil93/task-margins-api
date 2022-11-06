import { Adulthood, UserRole } from '../../enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { TypeormTemplate } from './_template.entity';
import { ClassParticipantEntity } from './class-participants.entity';
import { UserActionEntity } from './user-actions.entity';

@Entity({ name: 'users' })
export class UserEntity extends TypeormTemplate {
    @Column({
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    username: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    password: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default: () => UserRole.USER,
    })
    role: UserRole;

    @Column({
        type: 'enum',
        enum: Adulthood,
        nullable: false,
    })
    ageLevel: Adulthood;

    @Column({
        type: 'bool',
        nullable: false,
        default: () => `false`,
    })
    isVerified: boolean;

    @OneToMany(
        () => ClassParticipantEntity,
        (classParticipantEntity) => classParticipantEntity.user
    )
    classParticipants: ClassParticipantEntity[];
}
