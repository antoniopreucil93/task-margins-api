import * as moment from 'moment';
import * as request from 'supertest';

import { createApp } from '../src/app';
import usersData from '../src/database/seeders/userData.seed';
import { Adulthood } from '../src/enum';

let app;
let authToken;
let classId;
let sportId;

let authAdminToken;

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

describe('User actions', () => {
    beforeAll(async () => {
        app = await createApp();
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
                authAdminToken = token;
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Create sport', async () => {
        await request(app)
            .post('/api/create-sport')
            .set('Authorization', `Bearer ${authAdminToken}`)
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
            .set('Authorization', `Bearer ${authAdminToken}`)
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

    it('User login', async () => {
        await request(app)
            .post('/api/login')
            .expect(200)
            .send({ username: usersData[1].username, password: usersData[1].rawPassword })
            .expect(200)
            .then((response) => {
                const { token } = response.body;
                expect(token).not.toBeNull();
                authToken = token;
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Create rate', async () => {
        await request(app)
            .post('/api/create-rate')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ rate: 2, classId: classId })
            .then((response) => {
                const { rate, class: sportClass } = response.body;
                expect(rate).toBe(2);
                expect(sportClass.id).toBe(classId);
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Second user login', async () => {
        await request(app)
            .post('/api/login')
            .expect(200)
            .send({ username: usersData[2].username, password: usersData[2].rawPassword })
            .expect(200)
            .then((response) => {
                const { token } = response.body;
                expect(token).not.toBeNull();
                authToken = token;
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Create rate', async () => {
        await request(app)
            .post('/api/create-rate')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ rate: 4, classId: classId })
            .then((response) => {
                const { rate, class: sportClass } = response.body;
                expect(rate).toBe(4);
                expect(sportClass.id).toBe(classId);
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Create comment', async () => {
        await request(app)
            .post('/api/create-comment')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ comment: 'Lorem ipsum', classId: classId })
            .then((response) => {
                const { comment, class: sportClass } = response.body;
                expect(comment).toBe('Lorem ipsum');
                expect(sportClass.id).toBe(classId);
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Create rate', async () => {
        await request(app)
            .post('/api/create-rate')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ rate: 5, classId: classId })
            .then((response) => {
                const { rate, class: sportClass } = response.body;
                expect(rate).toBe(5);
                expect(sportClass.id).toBe(classId);
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Admin fetch one class with rating', async () => {
        await request(app)
            .get(`/api/admin/fetch-class/${classId}`)
            .set('Authorization', `Bearer ${authAdminToken}`)
            .then((response) => {
                const { rating } = response.body;
                expect(rating).toBe('3.67');
            })
            .catch((err) => {
                throw new Error(err);
            });
    });
});
