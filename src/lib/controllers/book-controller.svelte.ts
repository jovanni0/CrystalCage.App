import { createBook } from "$lib/api/book"
import type { Author } from "$lib/types/author"
import type { Series } from "$lib/types/series"
import type { Tag } from "$lib/types/tag"
import type { Universe } from "$lib/types/universe"
import { CoverPickerController } from "./cover-picker-controller.svelte"
import { VersionController } from "./version-controller.svelte"



export class BookController
{
    /* COVERS */
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


    /* VERSIONS */
    version_controller = new VersionController()


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


    async save()
    {
        if (!this.author_id || !this.volume_name) return

        const form_data = new FormData()

        form_data.append("author_id", this.author_id)
        form_data.append("title", this.volume_name)
        form_data.append("launch_date", this.release_date)
        form_data.append("blurb", this.description)
        form_data.append("notes", this.my_opinion)
        form_data.append("tags", JSON.stringify(this.tag_ids))

        if (this.universe_id) 
            form_data.append("universe_id", this.universe_id)

        if (this.series_id) 
            form_data.append("series_id", this.series_id)

        if (this.volume_number !== undefined) 
            form_data.append("volume_number", this.volume_number.toString())

        for (const cover of this.cover_picker_controller.covers)
            form_data.append("covers", cover.file)

        for (const version of this.version_controller.versions)
            form_data.append("versions", version.file)

        form_data.append("cover_titles", JSON.stringify(
            this.cover_picker_controller.covers.map(it => it.title ?? "")
        ))

        form_data.append("version_titles", JSON.stringify(
            this.version_controller.versions.map(it => it.title ?? "")
        ))

        form_data.append("default_cover_index", 
            this.cover_picker_controller.covers.findIndex(it => it.local_id === this.default_cover_id).toString()
        )

        await createBook(form_data)
    }
}