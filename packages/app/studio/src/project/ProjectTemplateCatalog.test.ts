import {describe, expect, it} from "vitest"
import {ProjectTemplates, projectMetaNameForTemplate} from "./ProjectTemplateCatalog"

describe("ProjectTemplateCatalog", () => {
    it("includes Blank and the four guided templates", () => {
        expect(ProjectTemplates.map(template => template.id)).toEqual([
            "blank", "podcast", "vocal-demo", "beat", "voiceover"
        ])
    })

    it("uses the locked track names", () => {
        const byId = Object.fromEntries(ProjectTemplates.map(template => [template.id, template.trackNames]))
        expect(byId.blank).toEqual([])
        expect(byId.podcast).toEqual(["Voice", "Music"])
        expect(byId["vocal-demo"]).toEqual(["Vocal", "Instrumental", "Reference"])
        expect(byId.beat).toEqual(["Drums", "Bass", "Other"])
        expect(byId.voiceover).toEqual(["Narration", "Bed"])
    })

    it("names blank projects Untitled and others after the template", () => {
        const blank = ProjectTemplates.find(template => template.id === "blank")!
        const podcast = ProjectTemplates.find(template => template.id === "podcast")!
        expect(projectMetaNameForTemplate(blank)).toBe("Untitled")
        expect(projectMetaNameForTemplate(podcast)).toBe("Podcast")
    })
})
