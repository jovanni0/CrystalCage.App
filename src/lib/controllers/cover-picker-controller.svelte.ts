import { uploadCover } from "$lib/api/cover";
import type { Cover } from "$lib/types/cover";



export class CoverPickerController
{
    covers = $state<Cover[]>([])
    is_uploading = $state(false)
    
    has_covers = $derived(this.covers.length > 0)


    async uploadCover(cover: File)
    {
        this.is_uploading = true

        try {
            const form_data = new FormData()
            form_data.append("cover", cover)
            
            const new_cover = await uploadCover(form_data)
            this.covers.push(new_cover)
        }
        catch (e) {
            console.error(e)
        }

        this.is_uploading = false
    }


    // async deleteCover(id: string)
    // {
    //     await deleteCover(id)
    //     this.covers = this.covers.filter(it => it.id !== id)
    // }
}