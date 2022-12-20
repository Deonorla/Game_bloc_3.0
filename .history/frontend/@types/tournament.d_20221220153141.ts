export interface tournamentData {
    id: number;
    background: string;
    title: string;
    description: string;
    genre: string;
    action: string;
    adventure: string;
}; 

export type tournamentContextType = {
    tournament: tournamentData[];
    username: string;
}