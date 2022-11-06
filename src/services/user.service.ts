import { User } from '../models';
import { hashSync } from 'bcrypt';
import { Adulthood, UserRole } from '../enum';

export class UserService {
    public createUser(
        username: string,
        password: string,
        ageLevel: Adulthood,
        role: UserRole
    ): User {
        const newUser = new User();
        newUser.username = username;
        newUser.password = hashSync(password, 10);
        newUser.ageLevel = ageLevel;
        newUser.role = role;
        return newUser;
    }
}
