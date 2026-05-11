import { createSeries, getAllSeries } from "$lib/api/series"
import type { Series } from "$lib/types/series"



export class SeriesPickerController
{
    is_loading = $state(false)
    series = $state<Series[]>([])
    search_query = $state<string>("")

    has_series = $derived(this.series.length > 0)


    /**
     * Request series list from the server.
     */
    async requestAllSeries(universe_id: string)
    {
        this.is_loading = true
        this.series = await getAllSeries(universe_id)
        this.is_loading = false
    }


    /**
     * Request the creation of a new series record.
     */
    async createSeries(universe_id: string)
    {
        const new_series_name = this.search_query.trim()

        if (new_series_name.length === 0)
        {
            console.error(`the field has no series name: ${this.search_query}`)
            return
        }

        this.is_loading = true

        let new_series
        try {
            new_series = await createSeries(universe_id, new_series_name, "in progress")
            this.series.push(new_series)
        }
        catch (e) {
            console.error(e)
        }

        this.is_loading = false
        this.search_query = ""
        
        return new_series?.id
    }

    
    getSeries(id: string) : Series|undefined
    {
        return this.series.find(it => it.id == id)
    }
}