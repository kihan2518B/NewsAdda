export type Match = { //this is type object of details of matches when we fetch all matches at once
    id: number,
    isRunning: boolean,
    name: string,
    location: string,
    sportName: string,
    endsAt: string,
    teams: { id: number, name: string }[],
}

export type matchDetails = { //this is type object of full details of match
    id: number,
    isRunning: boolean,
    name: string,
    location: string,
    endsAt: string,
    startsAt: string,
    score: { [teamName: string]: string },
    teams: { id: number, name: string }[],
    sportName: string,
    playingTeam: number,
    story: string,
}