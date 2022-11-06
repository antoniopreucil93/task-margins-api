import * as request from 'supertest';

import { createApp } from '../src/app';
import usersData from '../src/database/seeders/userData.seed';

let app;
let authToken;
let sportId;

const sportDataForInsert = {
    name: 'new sport',
    description: 'Lorem ipsum. Lorem ipsum',
};

const sportDataForUpdate = {
    name: 'updated sport',
    description: 'Lorem ipsum. Lorem ipsum. Lore Ipsum',
};

describe('Sport CRUD', () => {
    beforeAll(async () => {
        app = await createApp();
    });

    it('Admin login', async () => {
        await request(app)
            .post('/api/login')
            .send({ username: usersData[0].username, password: usersData[0].rawPassword })
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

    it('Create sport', async () => {
        await request(app)
            .post('/api/create-sport')
            .set('Authorization', `Bearer ${authToken}`)
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

    it('Create second sport', async () => {
        await request(app)
            .post('/api/create-sport')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
            .send({
                name: sportDataForInsert.name,
                description: sportDataForInsert.description,
            })
            .then((response) => {
                const { name, description } = response.body;
                expect(name).toBe(sportDataForInsert.name);
                expect(description).toBe(sportDataForInsert.description);
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Update sport', async () => {
        await request(app)
            .patch(`/api/update-sport/${sportId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
            .send({
                name: sportDataForUpdate.name,
                description: sportDataForUpdate.description,
            })
            .then((response) => {
                const { id, name, description } = response.body;
                expect(id).toBe(sportId);
                expect(name).toBe(sportDataForUpdate.name);
                expect(description).toBe(sportDataForUpdate.description);
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Get one sport', async () => {
        await request(app)
            .get(`/api/fetch-sport/${sportId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
            .then((response) => {
                const { id, name, description } = response.body;
                expect(name).toBe(sportDataForUpdate.name);
                expect(description).toBe(sportDataForUpdate.description);
            })
            .catch((err) => {
                throw new Error(err);
            });
    });
});
