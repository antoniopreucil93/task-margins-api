import { Sport } from '../models';
import { Adulthood } from '../enum';
import { Class } from '../models/class.model';

export class ClassService {
    public createClass(
        ageLevel: Adulthood,
        weekSchedule: any,
        maxNumberOfParticipants: number,
        sport: Sport
    ): Class {
        const newClass = new Class();
        newClass.ageLevel = ageLevel;
        newClass.weekSchedule = weekSchedule;
        newClass.maxNumberOfParticipants = maxNumberOfParticipants;
        newClass.sport = sport;
        return newClass;
    }
}
