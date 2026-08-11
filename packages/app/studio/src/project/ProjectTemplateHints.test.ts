import {describe, expect, it} from "vitest"
import {
    nextActionHintForTrack,
    projectEmptyTimelineHint,
    readTemplateIdFromTags,
    templateTagForId
} from "./ProjectTemplateHints"

describe("ProjectTemplateHints", () => {
    it("builds and reads template tags", () => {
        expect(templateTagForId("podcast")).toBe("template:podcast")
        expect(readTemplateIdFromTags(["template:podcast"]).unwrap()).toBe("podcast")
        expect(readTemplateIdFromTags([]).isEmpty()).toBe(true)
    })

    it("returns next-action copy for known tracks", () => {
        expect(nextActionHintForTrack(["template:podcast"], "Voice").unwrap())
            .toBe("Record your voice here")
        expect(nextActionHintForTrack(["template:podcast"], "Music").unwrap())
            .toBe("Drop a music bed here")
        expect(nextActionHintForTrack(["template:beat"], "Unknown").isEmpty()).toBe(true)
    })

    it("returns project-level empty timeline hints", () => {
        expect(projectEmptyTimelineHint(["template:voiceover"]))
            .toBe("Record Narration, or drop a Bed")
        expect(projectEmptyTimelineHint([])).toBe("Drop instruments or samples here")
    })
})
