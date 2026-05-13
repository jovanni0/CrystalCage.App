import type { LocalVersion } from "$lib/types/local-version";



export class VersionController
{
    versions = $state<LocalVersion[]>([])

    has_versions = $derived(this.versions.length > 0)
    formats = $derived.by(() => 
    {
        return [...new Set(this.versions.map(it => it.format ?? "?"))]
    })
    format_message = $derived.by( () => 
    {
        const count = this.formats.length

        if (count == 1)
            return "1 type available"
        else
            return `${count} types available`
    })


    /**
     * Add a new version to the book.
     * @param file The file uploaded from the user's device.
     */
    addVersion(file: File)
    {
        const extension = file.name.split('.').pop()?.toLowerCase()

        const new_version: LocalVersion = {
            local_id: crypto.randomUUID(),
            file: file,
            format: extension,
            title: `Version ${this.versions.length + 1}`,
            created_at: new Date()
        }

        this.versions.push(new_version)
    }


    /**
     * Remove a version form the list.
     * @param local_id The id of the deleted version.
     */
    removeVersion(local_id: string)
    {
        this.versions = this.versions.filter(it => it.local_id !== local_id)
    }


    /**
     * Modify the title of a version.
     * @param local_id The id of the version being modified.
     * @param title The new title of the version.
     */
    setTitle(local_id: string, title: string)
    {
        const version = this.versions.find(it => it.local_id === local_id)

        if (version)
            version.title = title
    }
}