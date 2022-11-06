import { Client } from 'pg';
import * as moment from 'moment';
import * as dotenv from 'dotenv';

import usersData from './userData.seed';
import sportsData from './sportData.seed';
import classesData from './classData.seed';

dotenv.config();

(async function seed() {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
    });

    await client.connect();

    await seedUsers(client);
    const sportIds = await seedSports(client);

    await seedClass(client, sportIds);

    await client.end();
    console.log('seed complete!');
})();

async function seedUsers(client: Client): Promise<number[]> {
    const userIds = [];

    for (let i = 0, len = usersData.length; i < len; i++) {
        const userData = usersData[i];

        await client
            .query(
                `INSERT INTO users (username, password, role, age_level, is_verified)
                VALUES ('${userData.username}', '${userData.password}', '${userData.role}', '${userData.ageLevel}', '${userData.isVerified}') RETURNING *`
            )
            .then((data) => {
                userIds.push(data.rows[0].id);
            });
    }

    return userIds;
}

async function seedSports(client: Client): Promise<number[]> {
    const sportIds = [];

    for (let i = 0, len = sportsData.length; i < len; i++) {
        const sportData = sportsData[i];
        const sport = await client
            .query(
                `INSERT INTO sports (name, description) VALUES ('${sportData.name}', '${sportData.description}') RETURNING *`
            )
            .then((data) => {
                sportIds.push(data.rows[0].id);
            });
    }

    return sportIds;
}

async function seedClass(client: Client, sportIds: number[]): Promise<number[]> {
    const sportId = sportIds[Math.floor(Math.random() * sportIds.length)];

    const classIds = [];

    for (let i = 0, len = classesData.length; i < len; i++) {
        const classData = classesData[i];
        await client
            .query(
                `INSERT INTO classes (description, age_level, week_schedule, max_number_of_participants, sport_id, class_duration)
            VALUES ('${classData.description}', '${classData.ageLevel}', '${JSON.stringify(
                    classData.weekSchedule
                )}', '${classData.maxNumberOfParticipants}', '${sportId}', '${
                    classData.classDuration
                }') RETURNING *`
            )
            .then((data) => {
                classIds.push(data.rows[0].id);
            });
    }

    return classIds;
}
