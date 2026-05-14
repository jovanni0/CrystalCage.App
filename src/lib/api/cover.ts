import type { Book } from "$lib/types/book";
import type { Cover } from "$lib/types/cover";
import { BASE_URL } from "./author";



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



export async function getAllBooks(): Promise<Book[]>
{
    const response = await fetch(`${BASE_URL}/books`);

    if (!response.ok)
    {
        throw new Error(`Failed to fetch book: ${response.statusText}`);
    }

    return response.json();
}