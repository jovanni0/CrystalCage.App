import type { Author } from "$lib/types/author"
import type { Series } from "$lib/types/series"
import type { Tag } from "$lib/types/tag"
import type { Universe } from "$lib/types/universe"
import { CoverPickerController } from "./cover-picker-controller.svelte"


type Edition = {
    name: string
}

export class BookController
{
    cover_picker_controller = new CoverPickerController()
    default_cover_id = $state<string>("")

    has_covers = $derived(this.cover_picker_controller.has_covers)
    default_cover_title = $derived.by( () => {
        const cover = this.cover_picker_controller.getCover(this.default_cover_id)

        return cover?.title
    })
    default_cover_message = $derived.by( () =>
    {
        const count = this.cover_picker_controller.covers.length

        if (count == 1)
            return "No other options available. Tap to configure"
        else if (count == 2)
            return "1 other option available. Tap to configure"
        else
            return `${count} other options available. Tap to configure`
    })
    default_cover_url = $derived.by( () => 
    {
        const cover = this.cover_picker_controller.getCover(this.default_cover_id)

        return cover?.preview_url ?? ""
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