import { createAuthor, getAuthors } from "$lib/api/author"
import type { Author } from "$lib/types/author"



export class AuthorPickerController
{
    is_loading = $state(false)
    authors = $state<Author[]>([])
    search_query = $state<string>("")

    has_authors = $derived(this.authors.length > 0)

    /**
     * Request authors list from the server.
     */
    async reques_authors()
    {
        this.is_loading = true
        this.authors = await getAuthors()
        this.is_loading = false
    }

    /**
     * Request the creation of a new author record.
     * @param first_name 
     * @param last_name 
     */
    createAuthor = async () =>
    {
        const last_name = this.search_query.split(',').at(0)?.trim()
        const first_name = this.search_query.split(',').slice(1).join(", ")?.trim()

        if (!last_name)
        {
            console.error(`the field has no author first name: ${this.search_query}`)
            return
        }

        this.is_loading = true

        let new_author
        try {
            new_author = await createAuthor(first_name, last_name)
            this.authors.push(new_author)
        }
        catch (e) {
            console.error(e)
        }

        this.is_loading = false
        this.search_query = ""
        
        return new_author?.id
    }

    
    getAuthor(id: string) : Author|undefined
    {
        return this.authors.find(it => it.id == id)
    }
}