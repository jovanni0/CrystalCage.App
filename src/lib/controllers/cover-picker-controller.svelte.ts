import type { LocalCover } from "$lib/types/local-cover";



export class CoverPickerController
{
    covers = $state<LocalCover[]>([])
    is_uploading = $state(false)
    
    has_covers = $derived(this.covers.length > 0)


    /**
     * Create a new local cover record.
     * @param file The actual cover file uploaded from the user's device
     */
    addCover(file: File): string
    {
        const new_local_cover: LocalCover = {
            local_id: crypto.randomUUID(),
            file: file,
            preview_url: URL.createObjectURL(file),
            title: undefined
        }

        this.covers.push(new_local_cover)

        return new_local_cover.local_id
    }


    /**
     * Remove a cover from the list.
     * @param local_id The id of the cover being removed.
     */
    removeCover(local_id: string): void
    {
        const cover = this.covers.find(it => it.local_id === local_id)

        if (cover)
            URL.revokeObjectURL(cover.preview_url)

        this.covers = this.covers.filter(it => it.local_id !== local_id)
    }


    getCover(local_id: string): LocalCover|undefined
    {
        const cover = this.covers.find(it => it.local_id === local_id)

        return cover
    }


    /**
     * Modify the title of a cover.
     * @param local_id The id of the cover being modified.
     * @param title The new title of the cover.
     */
    setTitle(local_id: string, title: string): void
    {
        const cover = this.covers.find(it => it.local_id === local_id)

        if (cover)
            cover.title = title
    }


    destroy()
    {
        this.covers.forEach(it => URL.revokeObjectURL(it.preview_url))
    }
}