import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { TypeormTemplate } from './_template.entity';
import { UserEntity } from './user.entity';
import { ClassEntity } from './class.entity';

@Entity({ name: 'user_actions' })
export class UserActionEntity extends TypeormTemplate {
    @Column({
        type: 'integer',
        nullable: true,
    })
    rate: number;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    comment: string;

    @ManyToOne(() => ClassEntity, (classEntity) => classEntity.userActions)
    class: ClassEntity;
}
