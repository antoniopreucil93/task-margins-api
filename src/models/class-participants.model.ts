import { Class } from './class.model';
import { User } from './user.model';
import { TemplateModel } from './_template.model';

export class ClassParticipants extends TemplateModel {
    user: User;
    class: Class;
}
