import type { Tag } from "$lib/types/tag";
import type { Universe } from "$lib/types/universe";
import { BASE_URL } from "./author";



/**
 * Get all tags associated.
 * @returns 
 */
export async function getAllTags(): Promise<Tag[]>
{
    const response = await fetch(`${BASE_URL}/tags`);

    if (!response.ok)
    {
        throw new Error(`Failed to fetch tags: ${response.statusText}`);
    }

    return response.json();
}


/**
 * Create a new tag.
 * @param name 
 * @returns 
 */
export async function createTag(name: string, description?: string): Promise<Universe>
{
    const response = await fetch(`${BASE_URL}/tags`,
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
    });

    if (!response.ok)
    {
        throw new Error(`Failed to create tag: ${response.statusText}`);
    }

    return response.json();
}