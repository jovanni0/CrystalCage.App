import type { Author } from "$lib/types/author";

export const BASE_URL = 'http://localhost:8080';


export async function getAuthors(): Promise<Author[]>
{
    const response = await fetch(`${BASE_URL}/authors`);

    if (!response.ok)
    {
        throw new Error(`Failed to fetch authors: ${response.statusText}`);
    }

    return response.json();
}

export async function createAuthor(first_name: string, last_name: string): Promise<Author>
{
    const response = await fetch(`${BASE_URL}/authors`,
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name, last_name })
    });

    if (!response.ok)
    {
        throw new Error(`Failed to create author: ${response.statusText}`);
    }

    return response.json();
}