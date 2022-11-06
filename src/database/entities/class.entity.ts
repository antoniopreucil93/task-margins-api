import { Adulthood } from '../../enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ClassParticipantEntity } from './class-participants.entity';
import { SportEntity } from './sport.entity';
import { TypeormTemplate } from './_template.entity';
import { UserActionEntity } from './user-actions.entity';

@Entity({ name: 'classes' })
export class ClassEntity extends TypeormTemplate {
    @Column({
        type: 'varchar',
        nullable: true,
    })
    description: string;

    @Column({
        type: 'enum',
        enum: Adulthood,
        nullable: false,
    })
    ageLevel: Adulthood;

    @Column({
        type: 'json',
        nullable: false,
    })
    weekSchedule: any;

    @Column({
        type: 'int',
        nullable: true,
        default: () => '10',
    })
    maxNumberOfParticipants: number;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    classDuration: string;

    @Column({
        type: 'decimal',
        nullable: false,
        default: () => '0',
    })
    rating: number;

    @ManyToOne(() => SportEntity, (sportEntity) => sportEntity.classes)
    sport: SportEntity;

    @OneToMany(() => ClassParticipantEntity, (classParticipant) => classParticipant.class)
    classParticipants: ClassParticipantEntity[];

    @OneToMany(() => UserActionEntity, (userActionEntity) => userActionEntity.class)
    userActions: UserActionEntity[];
}
