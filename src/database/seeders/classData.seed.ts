import { Adulthood } from '../../enum';

const classesData = [
    {
        description: 'Lorem Ipsum.',
        ageLevel: Adulthood.Adult,
        maxNumberOfParticipants: 10,
        classDuration: '1h',
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
    },
    {
        description: 'Lorem Ipsum.',
        ageLevel: Adulthood.Children,
        maxNumberOfParticipants: 10,
        classDuration: '1h',
        weekSchedule: [
            [
                { date: '2022-01-01', time: '09:00-10:00' },
                { date: '2022-01-03', time: '09:00-10:00' },
                { date: '2022-01-05', time: '09:00-10:00' },
            ],
            [
                { date: '2022-01-08', time: '09:00-10:00' },
                { date: '2022-01-08', time: '09:00-10:00' },
                { date: '2022-01-08', time: '09:00-10:00' },
            ],
        ],
    },
    {
        description: 'Lorem Ipsum.',
        ageLevel: Adulthood.YoungAdult,
        maxNumberOfParticipants: 10,
        classDuration: '1h',
        weekSchedule: [
            [
                { date: '2022-01-01', time: '11:00-12:00' },
                { date: '2022-01-03', time: '11:00-12:00' },
                { date: '2022-01-05', time: '11:00-12:00' },
            ],
            [
                { date: '2022-01-08', time: '11:00-12:00' },
                { date: '2022-01-08', time: '11:00-12:00' },
                { date: '2022-01-08', time: '11:00-12:00' },
            ],
        ],
    },
    {
        description: 'Lorem Ipsum.',
        ageLevel: Adulthood.Youth,
        maxNumberOfParticipants: 10,
        classDuration: '1h',
        weekSchedule: [
            [
                { date: '2022-01-01', time: '14:00-15:00' },
                { date: '2022-01-03', time: '14:00-15:00' },
                { date: '2022-01-05', time: '14:00-15:00' },
            ],
            [
                { date: '2022-01-08', time: '14:00-15:00' },
                { date: '2022-01-08', time: '14:00-15:00' },
                { date: '2022-01-08', time: '14:00-15:00' },
            ],
        ],
    },
];

export default classesData;
