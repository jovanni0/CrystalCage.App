import { createTag, getAllTags } from "$lib/api/tag"
import type { Tag } from "$lib/types/tag"



export class TagPickerController
{
    is_loading = $state(false)
    tags = $state<Tag[]>([])
    search_query = $state<string>("")

    has_tags = $derived(this.tags.length > 0)


    /**
     * Request tag list from the server.
     */
    async requestTags()
    {
        this.is_loading = true
        this.tags = await getAllTags()
        this.is_loading = false
    }


    /**
     * Request the creation of a new tag record.
     * @param name
     * @param description 
     */
    async createTag()
    {
        const new_tag_name = this.search_query.trim()

        if (new_tag_name.length === 0)
        {
            console.error(`the field has no tag name: ${this.search_query}`)
            return
        }

        this.is_loading = true

        let new_tag
        try {
            new_tag = await createTag(new_tag_name)
            this.tags.push(new_tag)
        }
        catch (e) {
            console.error(e)
        }

        this.is_loading = false
        this.search_query = ""
        
        return new_tag?.id
    }

    
    getTag(id: string) : Tag|undefined
    {
        return this.tags.find(it => it.id == id)
    }
}