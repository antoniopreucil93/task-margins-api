import * as moment from 'moment';
import { Adulthood } from '../enum';
import { Class, User } from '../models';

export class ClassParticipatServiceValidator {
    public validateUserApplication(
        totalNumberOfclassParticipants: number,
        totalNumberOfUserApplications: number,
        sportClass: Class,
        user: User
    ) {
        if (totalNumberOfclassParticipants >= sportClass.maxNumberOfParticipants) {
            return { error: 'Class is full.', status: false };
        }

        if (totalNumberOfUserApplications === 2) {
            return { error: 'Maximum number of user applications.', status: false };
        }

        if (sportClass.ageLevel !== user.ageLevel) {
            return {
                error: 'Wrong age level.',
                status: false,
            };
        }

        return { status: true };
    }
}
