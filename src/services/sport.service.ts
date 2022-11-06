import { Sport } from '../models';

export class SportService {
    public createSport(name: string, description?: string): Sport {
        const newSport = new Sport();
        newSport.name = name;
        newSport.description = description;
        return newSport;
    }
}
