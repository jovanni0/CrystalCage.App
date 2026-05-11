import type { Author } from "$lib/types/author"
import type { Universe } from "$lib/types/universe"

type Cover = {
    name: string
}

type Edition = {
    name: string
}

export class BookController
{
    default_cover = $state<Cover>()
    covers = $state<Cover[]>([])
    editions = $state<Edition[]>([])
    selected_author = $state<Author|undefined>(undefined)
    selected_universe = $state<Universe|undefined>(undefined)


    has_covers = $derived(this.covers.length > 0)
    has_editions = $derived(this.editions.length > 0)
    author_id = $derived(this.selected_author?.id)
    author_name = $derived(this.selected_author ? `${this.selected_author.last_name}, ${this.selected_author.first_name}` : undefined)
    universe_id = $derived(this.selected_universe?.id)
    universe_name = $derived(this.selected_universe?.name)


    updateAuthor(author: Author) 
    {
        this.selected_author = author
        
        if (this.selected_universe?.author_id !== author.id)
            this.selected_universe = undefined
    }
}