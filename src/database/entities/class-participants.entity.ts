import { Column, Entity, ManyToOne, Index } from 'typeorm';
import { ClassEntity } from './class.entity';
import { UserEntity } from './user.entity';
import { TypeormTemplate } from './_template.entity';

@Entity({ name: 'class_participants' })
@Index(['user', 'class'], { unique: true })
export class ClassParticipantEntity extends TypeormTemplate {
    @ManyToOne(() => UserEntity, (user) => user.classParticipants)
    user: UserEntity;

    @ManyToOne(() => ClassEntity, (classEntity) => classEntity.classParticipants)
    class: ClassEntity;
}
