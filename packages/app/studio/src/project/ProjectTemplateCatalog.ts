export type ProjectTemplateId = "blank" | "podcast" | "vocal-demo" | "beat" | "voiceover"

export type ProjectTemplate = {
    id: ProjectTemplateId
    name: string
    description: string
    trackNames: ReadonlyArray<string>
}

export const ProjectTemplates: ReadonlyArray<ProjectTemplate> = [
    {
        id: "blank",
        name: "Blank",
        description: "Empty timeline. Start from a clean slate.",
        trackNames: []
    },
    {
        id: "podcast",
        name: "Podcast",
        description: "Talk track plus background music.",
        trackNames: ["Voice", "Music"]
    },
    {
        id: "vocal-demo",
        name: "Vocal Demo",
        description: "Vocal, instrumental, and a reference take.",
        trackNames: ["Vocal", "Instrumental", "Reference"]
    },
    {
        id: "beat",
        name: "Beat",
        description: "Drums, bass, and room for other parts.",
        trackNames: ["Drums", "Bass", "Other"]
    },
    {
        id: "voiceover",
        name: "Voiceover",
        description: "Narration plus a background bed.",
        trackNames: ["Narration", "Bed"]
    }
]

export const projectMetaNameForTemplate = (template: ProjectTemplate): string =>
    template.id === "blank" ? "Untitled" : template.name
