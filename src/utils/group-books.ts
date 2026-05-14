import type { Book } from "$lib/types/book"



export type AuthorSummary = {
    author_name: string;
    universes: UniverseSummary[];
};

export type UniverseSummary = {
    universe_name?: string;
    series: SeriesSummary[];
};

export type SeriesSummary = {
    series_name: string;
    series_id: string;
    book_count: number;
    representative_cover_id: string | null;
};



// export function groupBooksAsSeries(books: Book[])
// {
//     const grups = new Map<string, Map<string, Book>>()

//     books.forEach( book =>
//     {
//         const author = `${book.author_last_name}, ${book.author_first_name}`
//         const universe_key = `${author} - ${book.universe_name ?? ""}`

//         if (!grups.has(universe_key))
//             grups.set(universe_key, new Map<string, Book>())

//         const universe = grups.get(universe_key)
//         const series_id = book.series_id || "STANDALONE"
//         const existing_series_record = universe?.get(series_id)
//         const is_earlier_volume = book.volume_number !== undefined &&
//                                 existing_series_record?.volume_number !== undefined &&
//                                 book.volume_number < existing_series_record.volume_number

//         if (!existing_series_record || is_earlier_volume)
//         {
//             const series_record = {...book}

//             if (!book.series_id)
//                 series_record.series_name = "[ Standalone ]"

//             universe?.set(series_id, series_record)
//         }
//     })

//     return Array
//         .from(grups, ([universe, series]) => ({
//             universe,
//             series: Array
//                 .from(series.values())
//                 .sort( (a, b) => (a.series_name || "").localeCompare(b.series_name || "") )
//             }))
//         .sort( (a, b) => a.universe.localeCompare(b.universe));
// }


export function groupLibraryBySummary(books: Book[]): AuthorSummary[] {
    const authorMap = new Map<string, Map<string, Map<string, SeriesSummary>>>();

    books.forEach(book => {
        const authorName = `${book.author_last_name}, ${book.author_first_name}`;
        
        // Use a placeholder string ONLY for the Map key to prevent crashes/collisions
        const universeKey = book.universe_name ?? "__NULL_UNIVERSE__";
        const seriesId = book.series_id || "STANDALONE";

        if (!authorMap.has(authorName)) {
            authorMap.set(authorName, new Map());
        }
        const universeMap = authorMap.get(authorName)!;

        if (!universeMap.has(universeKey)) {
            universeMap.set(universeKey, new Map());
        }
        const seriesMap = universeMap.get(universeKey)!;

        const existing = seriesMap.get(seriesId);
        if (!existing) {
            seriesMap.set(seriesId, {
                series_name: book.series_id ? (book.series_name || "Unknown Series") : "[ Standalone ]",
                series_id: seriesId,
                book_count: 1,
                representative_cover_id: book.cover_id || null
            });
        } else {
            existing.book_count++;
            if (book.volume_number === 1) {
                existing.representative_cover_id = book.cover_id || existing.representative_cover_id;
            }
        }
    });

    return Array.from(authorMap, ([authorName, universeMap]): AuthorSummary => ({
        author_name: authorName,
        universes: Array.from(universeMap, ([universeKey, seriesMap]): UniverseSummary => ({
            // If the key is our placeholder, set the actual name to null
            universe_name: universeKey === "__NULL_UNIVERSE__" ? undefined : universeKey,
            series: Array.from(seriesMap.values()).sort((a, b) => 
                a.series_name.localeCompare(b.series_name)
            )
        })).sort((a, b) => (a.universe_name ?? "").localeCompare(b.universe_name ?? ""))
    })).sort((a, b) => a.author_name.localeCompare(b.author_name));
}