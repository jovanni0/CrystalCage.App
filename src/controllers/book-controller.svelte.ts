type Cover = {
    name: string
}

export class BookController
{
    default_cover = $state<Cover>()
    covers = $state<Cover[]>([])

    has_covers = $derived(this.covers.length > 0)
}