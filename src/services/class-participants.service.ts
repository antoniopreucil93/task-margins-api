import { Class, User, ClassParticipants } from '../models';

export class ClassParticipatService {
    public applyUserOnClass(sportClass: Class, user: User): ClassParticipants {
        const newClassParticipant = new ClassParticipants();
        newClassParticipant.user = user;
        newClassParticipant.class = sportClass;
        return newClassParticipant;
    }
}
