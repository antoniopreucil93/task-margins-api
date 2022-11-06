import { Class, UserAction } from '../models';

export class UserActionService {
    public createRate(sportClass: Class, rate: number) {
        const newUserAction = new UserAction();
        newUserAction.rate = rate;
        newUserAction.class = sportClass;
        return newUserAction;
    }

    public createComment(sportClass: Class, comment: string) {
        const newUserAction = new UserAction();
        newUserAction.comment = comment;
        newUserAction.class = sportClass;
        return newUserAction;
    }

    public calcAvgRatingBasedOnUserRates(classUserActions: UserAction[]): number {
        const totalRateValueForClass: number = classUserActions.reduce((prev, curr) => {
            prev += curr.rate;
            return prev;
        }, 0);

        const avgValue: number = totalRateValueForClass / classUserActions.length;

        const avgValueOnTwoDecimals: number = Math.round(avgValue * 100) / 100;

        return avgValueOnTwoDecimals;
    }
}
