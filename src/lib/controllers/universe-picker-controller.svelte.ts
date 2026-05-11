import { createUniverse, getUniverses } from "$lib/api/universe"
import type { Universe } from "$lib/types/universe"



export class UniversePickerController
{
    is_loading = $state(false)
    universes = $state<Universe[]>([])
    search_query = $state<string>("")

    has_universes = $derived(this.universes.length > 0)


    /**
     * Request universe list from the server.
     */
    async requestUniverses(author_id: string)
    {
        this.is_loading = true
        this.universes = await getUniverses(author_id)
        this.is_loading = false
    }


    /**
     * Request the creation of a new universe record.
     * @param first_name 
     * @param last_name 
     */
    createUniverse = async (author_id: string) =>
    {
        const new_universe_name = this.search_query.trim()

        if (new_universe_name.length === 0)
        {
            console.error(`the field has no universe name: ${this.search_query}`)
            return
        }

        this.is_loading = true

        let new_universe
        try {
            new_universe = await createUniverse(author_id, new_universe_name)
            this.universes.push(new_universe)
        }
        catch (e) {
            console.error(e)
        }

        this.is_loading = false
        this.search_query = ""
        
        return new_universe?.id
    }

    
    getUniverse(id: string) : Universe|undefined
    {
        return this.universes.find(it => it.id == id)
    }
}