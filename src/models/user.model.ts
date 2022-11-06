import { Adulthood, UserRole } from '../enum';
import { ClassParticipants } from './class-participants.model';
import { TemplateModel } from './_template.model';

export class User extends TemplateModel {
    username: string;
    password: string;
    role: UserRole;
    ageLevel: Adulthood;
    isVerified: boolean;
    classParticipants: ClassParticipants[];
}
