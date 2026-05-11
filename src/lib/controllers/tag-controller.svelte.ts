type Tag = {
    id: string
    name: string
    description: string
}


export class TagController
{
    tags = $state<Tag[]>([
        {id: "1", name: "Tag 1", description: "none"},
        {id: "2", name: "Tag 2", description: "none"},
        {id: "3", name: "Tag 3", description: "none"},
        {id: "4", name: "Tag 4", description: "none"},
    ])

    has_tags = $derived(this.tags.length > 0)
}