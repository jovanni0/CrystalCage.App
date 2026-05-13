import type { Author } from "$lib/types/author"
import type { Cover } from "$lib/types/cover"
import type { Series } from "$lib/types/series"
import type { Tag } from "$lib/types/tag"
import type { Universe } from "$lib/types/universe"


type Edition = {
    name: string
}

export class BookController
{
    covers = $state<Cover[]>([])
    default_cover = $state<string>("")

    has_covers = $derived(this.covers.length > 0)
    default_cover_title = $derived.by( () => {
        if (!this.has_covers)
            return "(No title set)"

        const cover = this.covers.find(it => it.id === this.default_cover)

        if (!cover)
            return "(No title set)"

        return cover.title ?? "(No title set)"
    })
    default_cover_message = $derived.by( () =>
    {
        const count = this.covers.length

        if (count == 0)
            return "No other options available. Tap to configure"
        else if (count == 1)
            return "1 other option available. Tap to configure"
        else
            return `${count} other options available. Tap to configure`
    })


    editions = $state<Edition[]>([])
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
    selected_tags = $state<Tag[]>([])

    tag_ids = $derived(this.selected_tags.map( it => it.id ))


    setAuthor(author: Author) 
    {
        this.selected_author = author
        
        if (this.selected_universe?.author_id !== author.id)
            this.selected_universe = undefined
    }
}