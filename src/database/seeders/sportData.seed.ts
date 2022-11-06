import { hashSync } from 'bcrypt';
import { UserRole } from '../../enum';

const sportsData: { name: string; description?: string }[] = [
    {
        name: 'Baseball',
        description: '',
    },
    {
        name: 'basketball',
        description: '',
    },
    {
        name: 'football',
        description: '',
    },
    {
        name: 'boxing',
        description: '',
    },
    {
        name: 'cycling',
        description: '',
    },
    {
        name: 'fitness',
        description: '',
    },
    {
        name: 'golf',
        description: '',
    },
    {
        name: 'running',
        description: '',
    },
    {
        name: 'swimming',
        description: '',
    },
    {
        name: 'triathlon',
        description: '',
    },
    {
        name: 'volleyball',
        description: '',
    },
];

export default sportsData;
