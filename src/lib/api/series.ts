import type { Series } from "$lib/types/series";
import type { Universe } from "$lib/types/universe";
import { BASE_URL } from "./author";



/**
 * Get all series associated to an universe.
 * @param universe_id 
 * @returns 
 */
export async function getAllSeries(universe_id: string): Promise<Series[]>
{
    const response = await fetch(`${BASE_URL}/series?universe_id=${universe_id}`);

    if (!response.ok)
    {
        throw new Error(`Failed to fetch series for universe ${universe_id}: ${response.statusText}`);
    }

    return response.json();
}


/**
 * Create a series tied to a a universe.
 * @param universe_id 
 * @param name 
 * @param status 
 * @returns 
 */
export async function createSeries(universe_id: string, name: string, status: string): Promise<Series>
{
    const response = await fetch(`${BASE_URL}/series`,
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            universe_id, 
            name,
            status
        })
    });

    if (!response.ok)
    {
        throw new Error(`Failed to create series: ${response.statusText}`);
    }

    return response.json();
}