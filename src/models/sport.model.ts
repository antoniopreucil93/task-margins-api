import { Class } from './class.model';
import { TemplateModel } from './_template.model';

export class Sport extends TemplateModel {
    name: string;
    description: string;
    classes: Class[];
}
