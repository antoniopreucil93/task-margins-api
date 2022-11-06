import { Adulthood } from '../enum';
import { ClassParticipants } from './class-participants.model';
import { Sport } from './sport.model';
import { UserAction } from './user-action.model';
import { TemplateModel } from './_template.model';

export class Class extends TemplateModel {
    description: string;
    classDuration: string;
    weekSchedule: any;
    maxNumberOfParticipants: number;
    rating: number;
    ageLevel: Adulthood;
    sport: Sport;
    classParticipants: ClassParticipants[];
    userActions: UserAction[];
}
