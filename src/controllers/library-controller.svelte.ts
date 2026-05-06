export class LibraryController
{
    books = $state([])
    is_loading = $state(false)

    /**
     * indicates if the library is empty (aka no books exists on the server).
     */
    is_library_empty = $derived(this.books.length === 0)
}