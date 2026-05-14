// import type { Book } from "$lib/types/book"
// import { describe, it, expect } from 'vitest'
// import { groupLibraryBySummary } from "../src/utils/group-books"



// it("should have 2 series", () =>
// {
//     const books: Book[] = [
//         { 
//             id: "1",
//             author_first_name: "Asher", 
//             author_last_name: "Neal", 
//             universe_name: "Polity",
//             series_id: "100000", 
//             series_name: "Transformation", 
//             volume_number: 1, 
//             title: "Dark Intelligence", 
//         },
//         { 
//             id: "2",
//             author_first_name: "Asher", 
//             author_last_name: "Neal", 
//             universe_name: "Polity",
//             volume_number: 1, 
//             title: "The Gabble", 
//         },
//     ]
//     const result = groupLibraryBySummary(books)

//     expect(result).toHaveLength(1)   // one author + universe
//     expect(result[0].series).toHaveLength(2)    // 2 series: Transformation and Standalones
// })



// it("different authors, 2 and 1 series", () =>
// {
//     const books: Book[] = [
//         { 
//             id: "1",
//             author_first_name: "Asher", 
//             author_last_name: "Neal", 
//             universe_name: "Polity",
//             series_id: "100000", 
//             series_name: "Transformation", 
//             volume_number: 1, 
//             title: "Dark Intelligence", 
//         },
//         { 
//             id: "2",
//             author_first_name: "Asher", 
//             author_last_name: "Neal", 
//             universe_name: "Polity",
//             volume_number: 1, 
//             title: "The Gabble", 
//         },
//         { 
//             id: "2",
//             author_first_name: "Martha", 
//             author_last_name: "Wells", 
//             title: "Murderbot", 
//         },
//     ]
//     const result = groupBooksAsSeries(books)

//     expect(result).toHaveLength(2)              // 2 author + universe: `Asher, Neal - Polity` and `Wells, Martha`
//     expect(result[0].series).toHaveLength(2)    // 2 series: `Transformation` and `Standalones`
//     expect(result[1].series).toHaveLength(1)    // 1 series: `Standalones`
// })