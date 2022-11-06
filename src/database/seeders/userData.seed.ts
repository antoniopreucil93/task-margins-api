import { hashSync } from 'bcrypt';
import { Adulthood, UserRole } from '../../enum';

const usersData: {
    username: string;
    password: string;
    role: string;
    rawPassword: string;
    ageLevel: Adulthood;
    isVerified: boolean;
}[] = [
    {
        username: 'admin@mail.com',
        password: hashSync('123456', 10),
        rawPassword: '123456',
        role: UserRole.ADMIN,
        ageLevel: Adulthood.Adult,
        isVerified: true,
    },
    {
        username: 'john@mail.com',
        password: hashSync('123456', 10),
        rawPassword: '123456',
        role: UserRole.USER,
        ageLevel: Adulthood.Adult,
        isVerified: true,
    },
    {
        username: 'bernard@mail.com',
        password: hashSync('123456', 10),
        rawPassword: '123456',
        role: UserRole.USER,
        ageLevel: Adulthood.Adult,
        isVerified: true,
    },
    {
        username: 'teddy@mail.com',
        password: hashSync('123456', 10),
        rawPassword: '123456',
        role: UserRole.USER,
        ageLevel: Adulthood.Adult,
        isVerified: true,
    },
    {
        username: 'dolores@mail.com',
        password: hashSync('123456', 10),
        rawPassword: '123456',
        role: UserRole.USER,
        ageLevel: Adulthood.Adult,
        isVerified: true,
    },
    {
        username: 'mia@mail.com',
        password: hashSync('123456', 10),
        rawPassword: '123456',
        role: UserRole.USER,
        ageLevel: Adulthood.Adult,
        isVerified: true,
    },
    {
        username: 'anderson@mail.com',
        password: hashSync('123456', 10),
        rawPassword: '123456',
        role: UserRole.USER,
        ageLevel: Adulthood.Adult,
        isVerified: true,
    },
    {
        username: 'silva@mail.com',
        password: hashSync('123456', 10),
        rawPassword: '123456',
        role: UserRole.USER,
        ageLevel: Adulthood.Adult,
        isVerified: true,
    },
    {
        username: 'iris@mail.com',
        password: hashSync('123456', 10),
        rawPassword: '123456',
        role: UserRole.USER,
        ageLevel: Adulthood.Adult,
        isVerified: true,
    },
    {
        username: 'lukas@mail.com',
        password: hashSync('123456', 10),
        rawPassword: '123456',
        role: UserRole.USER,
        ageLevel: Adulthood.Adult,
        isVerified: true,
    },
    {
        username: 'milton@mail.com',
        password: hashSync('123456', 10),
        rawPassword: '123456',
        role: UserRole.USER,
        ageLevel: Adulthood.Adult,
        isVerified: true,
    },
    {
        username: 'george@mail.com',
        password: hashSync('123456', 10),
        rawPassword: '123456',
        role: UserRole.USER,
        ageLevel: Adulthood.Adult,
        isVerified: true,
    },
];

export default usersData;
