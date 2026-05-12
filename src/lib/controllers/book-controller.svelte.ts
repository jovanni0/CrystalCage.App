import type { Author } from "$lib/types/author"
import type { Series } from "$lib/types/series"
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
    has_covers = $derived(this.covers.length > 0)
    has_editions = $derived(this.editions.length > 0)


    /* IDENTITY */
    selected_author = $state<Author|undefined>(undefined)
    selected_universe = $state<Universe|undefined>(undefined)
    selected_series = $state<Series|undefined>(undefined)
    volume_number = $state<number|undefined>(undefined)
    volume_name = $state<string|undefined>(undefined)

    author_id = $derived(this.selected_author?.id)
    author_name = $derived(this.selected_author ? `${this.selected_author.last_name}, ${this.selected_author.first_name}` : undefined)
    universe_id = $derived(this.selected_universe?.id)
    universe_name = $derived(this.selected_universe?.name)
    series_id = $derived(this.selected_series?.id)
    series_name = $derived(this.selected_series?.name)


    /* DETAILS */
    release_date = $state<string>("")
    word_count = $state<number|undefined>(undefined)

    /* OTHER */
    my_opinion = $state<string>("")
    description = $state<string>("")


    setAuthor(author: Author) 
    {
        this.selected_author = author
        
        if (this.selected_universe?.author_id !== author.id)
            this.selected_universe = undefined
    }
}