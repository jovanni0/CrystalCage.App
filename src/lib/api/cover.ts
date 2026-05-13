import type { Cover } from "$lib/types/cover";

export const BASE_URL = 'http://localhost:8080';


export async function uploadCover(form_data: FormData): Promise<Cover>
{
    const response = await fetch(`${BASE_URL}/covers`,
    {
        method: 'POST',
        body: form_data
    });

    if (!response.ok)
    {
        throw new Error(`Failed to upload cover: ${response.statusText}`);
    }

    return response.json();
}