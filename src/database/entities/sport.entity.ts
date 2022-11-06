import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ClassEntity } from './class.entity';
import { TypeormTemplate } from './_template.entity';

@Entity({ name: 'sports' })
export class SportEntity extends TypeormTemplate {
    @Column({
        type: 'varchar',
        nullable: false,
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    description: string;

    @OneToMany(() => ClassEntity, (classEntity) => classEntity.sport)
    classes: ClassEntity[];
}
