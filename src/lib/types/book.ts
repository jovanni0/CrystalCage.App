
/**
 * Represents the data sent back from the server when requesting all books in the
 * database on endpoint `GET /books`
 */
export type Book = {
    id: string,
    author_first_name: string,
    author_last_name: string,
    universe_id?: string,
    universe_name?: string
    series_id?: string,
    series_name?: string
    volume_number?: number
    title: string,
    cover_id?: string,
}