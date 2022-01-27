interface MovieInterface {
    id?: number;
    title?: string;
    release_date?: string;
    overview?: string;
}

export class Movie implements MovieInterface {

    public id?: number;
    public title?: string;
    public release_date?: string;
    public overview?: string;

    constructor({
        id,
        title,
        release_date,
        overview
    }: MovieInterface) {
        this.id = id;
        this.title = title;
        this.release_date = release_date;
        this.overview = overview;
    }
}

export interface MovieQueryResult {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}