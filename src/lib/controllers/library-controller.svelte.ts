import { getAllBooks } from "$lib/api/cover"
import type { Book } from "$lib/types/book"
import { derived } from "svelte/store"
import { groupLibraryBySummary } from "../../utils/group-books"

export class LibraryController
{
    books = $state<Book[]>([])

    /**
     * indicates if the library is empty (aka no books exists on the server).
     */
    is_library_empty = $derived(this.books.length === 0)

    books_by_author = $derived.by( () => 
    {
        const sortedBooks = [...this.books].sort( (a, b) => a.title.localeCompare(b.title) )
        const groups = new Map<string, Book[]>()

        sortedBooks.forEach( book => 
        {
            const authorKey = `${book.author_last_name}, ${book.author_first_name}`;
            
            if (!groups.has(authorKey)) 
                groups.set(authorKey, [])

            groups.get(authorKey)?.push(book)
        });

        return Array.from(groups, ([name, books]) => ({ name, books }))
    })


    books_by_series = $derived.by( () => groupLibraryBySummary(this.books) )


    /**
     * Get all the books on the server.
     */
    async fetchAll()
    {
        const all_books = await getAllBooks()

        this.books = all_books

        console.log(all_books)
    }
}