import type { Universe } from "$lib/types/universe";
import { BASE_URL } from "./author";



/**
 * Get all universes associated to an author.
 * @param author_id 
 * @returns 
 */
export async function getUniverses(author_id: string): Promise<Universe[]>
{
    const response = await fetch(`${BASE_URL}/universes?author_id=${author_id}`);

    if (!response.ok)
    {
        throw new Error(`Failed to fetch universes for author ${author_id}: ${response.statusText}`);
    }

    return response.json();
}


/**
 * Create an universe tied to a an author.
 * @param author_id 
 * @param name 
 * @returns 
 */
export async function createUniverse(author_id: string, name: string): Promise<Universe>
{
    const response = await fetch(`${BASE_URL}/universes`,
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author_id, name })
    });

    if (!response.ok)
    {
        throw new Error(`Failed to create universe: ${response.statusText}`);
    }

    return response.json();
}