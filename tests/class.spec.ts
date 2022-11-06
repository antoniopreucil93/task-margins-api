import * as moment from 'moment';
import * as request from 'supertest';

import { createApp } from '../src/app';
import usersData from '../src/database/seeders/userData.seed';
import { Adulthood } from '../src/enum';

let app;
let adminAuthToken;
let classId;
let sportId;

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

const classDataForUpdate = {
    ageLevel: Adulthood.YoungAdult,
    weekSchedule: [
        [
            { date: '2022-02-01', time: '07:00-09:00' },
            { date: '2022-02-03', time: '07:00-08:00' },
            { date: '2022-02-05', time: '07:00-09:00' },
        ],
        [
            { date: '2022-02-08', time: '07:00-09:00' },
            { date: '2022-02-08', time: '07:00-08:00' },
            { date: '2022-02-08', time: '07:00-09:00' },
        ],
    ],
};

const sportDataForInsert = {
    name: 'new sport for class',
    description: 'Lorem ipsum. Lorem ipsum',
};

const secondSportDataForInsert = {
    name: 'second sport',
    description: 'Lorem ipsum. Lorem ipsum. Lore Ipsum',
};

describe('Class CRUD', () => {
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

    it('Create second sport', async () => {
        await request(app)
            .post('/api/create-sport')
            .set('Authorization', `Bearer ${adminAuthToken}`)
            .expect(200)
            .send({
                name: secondSportDataForInsert.name,
                description: secondSportDataForInsert.description,
            })
            .then((response) => {
                const { id, name, description } = response.body;
                expect(name).toBe(secondSportDataForInsert.name);
                expect(description).toBe(secondSportDataForInsert.description);
                sportId = id;
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Update class', async () => {
        await request(app)
            .patch(`/api/update-class/${classId}`)
            .set('Authorization', `Bearer ${adminAuthToken}`)
            .expect(200)
            .send({
                ageLevel: classDataForUpdate.ageLevel,
                weekSchedule: classDataForUpdate.weekSchedule,
                sportId: sportId,
            })
            .then((response) => {
                const { id, ageLevel, weekSchedule, sport } = response.body;

                expect(ageLevel).toBe(classDataForUpdate.ageLevel);

                const mappedSchedule = weekSchedule.map((currentSchedule) =>
                    currentSchedule.map((cs) => ({
                        date: moment(cs.date).format('YYYY-MM-DD'),
                        time: cs.time,
                    }))
                );

                expect(mappedSchedule).toStrictEqual(classDataForUpdate.weekSchedule);
                expect(sportId).toBe(sport.id);
                classId = id;
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Fetch one class', async () => {
        await request(app)
            .get(`/api/admin/fetch-class/${classId}`)
            .set('Authorization', `Bearer ${adminAuthToken}`)
            .then((response) => {
                const { id, ageLevel, weekSchedule, rating } = response.body;

                expect(ageLevel).toBe(classDataForUpdate.ageLevel);

                const mappedSchedule = weekSchedule.map((currentSchedule) =>
                    currentSchedule.map((cs) => ({
                        date: moment(cs.date).format('YYYY-MM-DD'),
                        time: cs.time,
                    }))
                );

                expect(mappedSchedule).toStrictEqual(classDataForUpdate.weekSchedule);
                expect(id).toBe(classId);
                expect(+rating).toBe(0);
            })
            .catch((err) => {
                throw new Error(err);
            });
    });
});
