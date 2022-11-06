import * as request from 'supertest';

import { createApp } from '../src/app';
import usersData from '../src/database/seeders/userData.seed';
import { Adulthood, UserRole } from '../src/enum';

let app;
let authToken;
let classId;
let sportId;

let newUserId;
let newUserToken;

const newUser = {
    username: 'test@gmail.com',
    password: '123456',
    role: UserRole.USER,
    ageLevel: Adulthood.Adult,
};

const newUserDataForUpdate = {
    username: 'ante@gmail.com',
    password: '654321',
    role: UserRole.ADMIN,
    ageLevel: Adulthood.Children,
};

describe('User CRUD', () => {
    beforeAll(async () => {
        app = await createApp();
    });

    it('Admin login', async () => {
        await request(app)
            .post('/api/login')
            .expect(200)
            .send({ username: usersData[0].username, password: usersData[0].rawPassword })
            .then((response) => {
                const { token } = response.body;
                expect(token).not.toBeNull();
                authToken = token;
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Create user', async () => {
        await request(app)
            .post('/api/admin/create-user')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                username: newUser.username,
                password: newUser.password,
                role: newUser.role,
                ageLevel: newUser.ageLevel,
            })
            .then((response) => {
                const { id, username, role, ageLevel, token } = response.body;
                expect(username).toBe(newUser.username);
                expect(role).toBe(newUser.role);
                expect(ageLevel).toBe(newUser.ageLevel);
                newUserId = id;
                newUserToken = token;
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Verify child user', async () => {
        await request(app)
            .get(`/api/verify?tkn=${newUserToken}`)
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
            .expect(200)
            .send({ username: newUser.username, password: newUser.password })
            .then((response) => {
                const { token } = response.body;
                expect(token).not.toBeNull();
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Update user', async () => {
        await request(app)
            .patch(`/api/admin/update-user/${newUserId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                username: newUserDataForUpdate.username,
                password: newUserDataForUpdate.password,
                role: newUserDataForUpdate.role,
                ageLevel: newUserDataForUpdate.ageLevel,
            })
            .then((response) => {
                const { id, ageLevel, username, role } = response.body;

                expect(ageLevel).toBe(newUserDataForUpdate.ageLevel);
                expect(username).toStrictEqual(newUserDataForUpdate.username);
                expect(role).toStrictEqual(newUserDataForUpdate.role);
                expect(id).toBe(newUserId);

                classId = id;
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Updated user login', async () => {
        await request(app)
            .post('/api/login')
            .expect(200)
            .send({
                username: newUserDataForUpdate.username,
                password: newUserDataForUpdate.password,
            })
            .then((response) => {
                const { token } = response.body;
                expect(token).not.toBeNull();
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Fetch one user by admin', async () => {
        await request(app)
            .get(`/api/admin/fetch-user/${newUserId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .then((response) => {
                const { id, ageLevel, username, role } = response.body;

                expect(ageLevel).toBe(newUserDataForUpdate.ageLevel);
                expect(username).toStrictEqual(newUserDataForUpdate.username);
                expect(role).toStrictEqual(newUserDataForUpdate.role);
                expect(id).toBe(newUserId);
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Delete user', async () => {
        await request(app)
            .delete(`/api/admin/delete-user/${newUserId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .then((response) => {
                const { message } = response.body;

                expect(message).toBe('User deleted.');
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Deleted user login', async () => {
        await request(app)
            .post('/api/login')
            .send({
                username: newUserDataForUpdate.username,
                password: newUserDataForUpdate.password,
            })
            .then((response) => expect(response.text).toBe('User not found.'))
            .catch((err) => {
                throw new Error(err);
            });
    });
});
