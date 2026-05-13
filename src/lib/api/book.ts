import { BASE_URL } from "./author";



export async function createBook(form_data: FormData)
{
    const response = await fetch(`${BASE_URL}/books`,
    {
        method: 'POST',
        body: form_data
    });

    if (!response.ok)
    {
        throw new Error(`Failed to create author: ${response.statusText}`);
    }

    return response.json();
}