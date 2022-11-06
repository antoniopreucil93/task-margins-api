import * as moment from 'moment';
import * as request from 'supertest';

import { createApp } from '../src/app';
import usersData from '../src/database/seeders/userData.seed';
import { Adulthood, UserRole } from '../src/enum';

let app;

let adminAuthToken: string;

let childAuthToken: string;
const childUser = {
    username: 'ivan@gmail.com',
    rawPassword: '123456',
};

let classId: number;
let sportId: number;
let newLoggedInUserId: number;

let newUserAuthToken: string;
const newUser = {
    username: 'adams@gmail.com',
    rawPassword: '123456',
};

let eleventhUserToken: string;

const eleventhUser = {
    username: 'jane@gmail.com',
    rawPassword: '123456',
};

const classDataForInsert = {
    ageLevel: Adulthood.Adult,
    weekSchedule: [
        [
            { date: '2022-01-01', time: '07:00-08:00' },
            { date: '2022-01-03', time: '07:00-08:00' },
            { date: '2022-01-05', time: '07:00-08:00' },
        ],
        [
            { date: '2022-01-08', time: '07:00-08:00' },
            { date: '2022-01-08', time: '07:00-08:00' },
            { date: '2022-01-08', time: '07:00-08:00' },
        ],
    ],
};

const sportDataForInsert = {
    name: 'new sport for class',
    description: 'Lorem ipsum. Lorem ipsum',
};

describe('Class Participants', () => {
    beforeAll(async () => {
        app = await createApp();
        jest.setTimeout(300000);
    });

    it('Admin login', async () => {
        await request(app)
            .post('/api/login')
            .expect(200)
            .send({ username: usersData[0].username, password: usersData[0].rawPassword })
            .expect(200)
            .then((response) => {
                const { token } = response.body;
                expect(token).not.toBeNull();
                adminAuthToken = token;
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Create sport', async () => {
        await request(app)
            .post('/api/create-sport')
            .set('Authorization', `Bearer ${adminAuthToken}`)
            .expect(200)
            .send({
                name: sportDataForInsert.name,
                description: sportDataForInsert.description,
            })
            .then((response) => {
                const { id, name, description } = response.body;
                expect(name).toBe(sportDataForInsert.name);
                expect(description).toBe(sportDataForInsert.description);
                sportId = id;
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Create class', async () => {
        await request(app)
            .post('/api/create-class')
            .set('Authorization', `Bearer ${adminAuthToken}`)
            .expect(200)
            .send({
                ageLevel: classDataForInsert.ageLevel,
                weekSchedule: classDataForInsert.weekSchedule,
                sportId: sportId,
            })
            .then((response) => {
                const { id, ageLevel, weekSchedule } = response.body;

                expect(ageLevel).toBe(classDataForInsert.ageLevel);

                const mappedSchedule = weekSchedule.map((currentSchedule) =>
                    currentSchedule.map((cs) => ({
                        date: moment(cs.date).format('YYYY-MM-DD'),
                        time: cs.time,
                    }))
                );

                expect(mappedSchedule).toStrictEqual(classDataForInsert.weekSchedule);
                classId = id;
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    describe('Apply new  adult user', () => {
        it('Register new user', async () => {
            await request(app)
                .post('/api/register')
                .send({
                    username: newUser.username,
                    password: newUser.rawPassword,
                    ageLevel: Adulthood.Adult,
                    role: UserRole.USER,
                })
                .then((response) => {
                    const { username, token } = response.body;
                    expect(username).toBe(newUser.username);
                    newUserAuthToken = token;
                })
                .catch((err) => {
                    throw new Error(err);
                });
        });

        it('Verify new user', async () => {
            await request(app)
                .get(`/api/verify?tkn=${newUserAuthToken}`)
                .then((response) => {
                    const { message } = response.body;
                    expect(message).toBe('success');
                })
                .catch((err) => {
                    throw new Error(err);
                });
        });

        it('New user login', async () => {
            await request(app)
                .post('/api/login')
                .send({ username: newUser.username, password: newUser.rawPassword })
                .then((response) => {
                    const { token, userId } = response.body;
                    expect(token).not.toBeNull();
                    newUserAuthToken = token;
                    newLoggedInUserId = userId;
                })
                .catch((err) => {
                    throw new Error(err);
                });
        });

        it('Adult apply on class', async () => {
            await request(app)
                .post('/api/apply-on-class')
                .set('Authorization', `Bearer ${newUserAuthToken}`)
                .send({
                    classId: classId,
                })
                .then((response) => {
                    const { user, class: sportClass } = response.body;

                    expect(sportClass.id).toStrictEqual(classId);
                    expect(user.id).toStrictEqual(newLoggedInUserId);
                })
                .catch((err) => {
                    throw new Error(err);
                });
        });
    });

    describe('Apply child user on adult class', () => {
        it('Register child user', async () => {
            await request(app)
                .post('/api/register')
                .send({
                    username: childUser.username,
                    password: childUser.rawPassword,
                    ageLevel: Adulthood.Children,
                    role: UserRole.USER,
                })
                .then((response) => {
                    const { username, token } = response.body;
                    expect(username).toBe(childUser.username);
                    childAuthToken = token;
                })
                .catch((err) => {
                    throw new Error(err);
                });
        });

        it('Verify child user', async () => {
            await request(app)
                .get(`/api/verify?tkn=${childAuthToken}`)
                .then((response) => {
                    const { message } = response.body;
                    expect(message).toBe('success');
                })
                .catch((err) => {
                    throw new Error(err);
                });
        });

        it('Child user login', async () => {
            await request(app)
                .post('/api/login')
                .send({ username: childUser.username, password: childUser.rawPassword })
                .then((response) => {
                    const { token, userId } = response.body;
                    expect(token).toBeDefined();
                    childAuthToken = token;
                })
                .catch((err) => {
                    throw new Error(err);
                });
        });

        it('Apply child on class for adults', async () => {
            await request(app)
                .post('/api/apply-on-class')
                .set('Authorization', `Bearer ${childAuthToken}`)
                .send({
                    classId: classId,
                })
                .then((response) => expect(response.body).toBe('Wrong age level.'))
                .catch((err) => {
                    throw new Error(err);
                });
        });
    });

    describe('Apply eleven users on class', () => {
        for (let i = 0; i <= 9; i++) {
            const userData = usersData[i];

            let loggedInUserToken;

            it('User login', async () => {
                await request(app)
                    .post('/api/login')
                    .send({ username: userData.username, password: userData.rawPassword })
                    .then((response) => {
                        const { token } = response.body;
                        expect(token).not.toBeNull();
                        loggedInUserToken = token;
                    })
                    .catch((err) => {
                        throw new Error(err);
                    });
            });

            it('Apply user on class', async () => {
                await request(app)
                    .post('/api/apply-on-class')
                    .set('Authorization', `Bearer ${loggedInUserToken}`)
                    .send({
                        classId: classId,
                    })
                    .then(async (response) => {})
                    .catch((err) => {
                        throw new Error(err);
                    });
            });
        }

        it('Register eleventh user', async () => {
            await request(app)
                .post('/api/register')
                .send({
                    username: eleventhUser.username,
                    password: eleventhUser.rawPassword,
                    ageLevel: Adulthood.Adult,
                    role: UserRole.USER,
                })
                .then((response) => {
                    const { username, token } = response.body;
                    expect(username).toBe(eleventhUser.username);
                    eleventhUserToken = token;
                })
                .catch((err) => {
                    throw new Error(err);
                });
        });

        it('Verify eleventh user', async () => {
            await request(app)
                .get(`/api/verify?tkn=${eleventhUserToken}`)
                .then((response) => {
                    const { message } = response.body;
                    expect(message).toBe('success');
                })
                .catch((err) => {
                    throw new Error(err);
                });
        });

        it('Eleventh user login', async () => {
            await request(app)
                .post('/api/login')
                .send({ username: eleventhUser.username, password: eleventhUser.rawPassword })
                .then((response) => {
                    const { token } = response.body;
                    expect(token).not.toBeNull();
                    eleventhUserToken = token;
                })
                .catch((err) => {
                    throw new Error(err);
                });
        });

        it('Eleventh user apply on sport class', async () => {
            await request(app)
                .post('/api/apply-on-class')
                .set('Authorization', `Bearer ${eleventhUserToken}`)
                .send({
                    classId: classId,
                })
                .then((response) => expect(response.body).toBe('Class is full.'))
                .catch((err) => {
                    throw new Error(err);
                });
        });
    });

    describe('Sign out user from sport class', () => {
        it('Remove user from class', async () => {
            await request(app)
                .post('/api/sign-out-from-class')
                .set('Authorization', `Bearer ${newUserAuthToken}`)
                .send({
                    classId: classId,
                })
                .then((response) => {
                    const { message } = response.body;
                    expect(message).toBe('Class participant signed out.');
                })
                .catch((err) => {
                    throw new Error(err);
                });
        });
    });
});
