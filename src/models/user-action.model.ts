import { Class } from './class.model';
import { User } from './user.model';
import { TemplateModel } from './_template.model';

export class UserAction extends TemplateModel {
    rate: number;
    comment: string;
    class: Class;
}
