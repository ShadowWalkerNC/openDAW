import {Option} from "@opendaw/lib-std"
import {ProjectTemplateId} from "@/project/ProjectTemplateCatalog"

export const templateTagForId = (id: ProjectTemplateId): string => `template:${id}`

export const readTemplateIdFromTags = (tags: ReadonlyArray<string>): Option<ProjectTemplateId> => {
    const tag = tags.find(entry => entry.startsWith("template:"))
    if (!isTemplateTag(tag)) {return Option.None}
    return Option.wrap(tag.slice("template:".length) as ProjectTemplateId)
}

const isTemplateTag = (tag: string | undefined): tag is `template:${ProjectTemplateId}` =>
    tag === "template:blank"
    || tag === "template:podcast"
    || tag === "template:vocal-demo"
    || tag === "template:beat"
    || tag === "template:voiceover"

const TrackHints: Record<string, string> = {
    "podcast:Voice": "Record your voice here",
    "podcast:Music": "Drop a music bed here",
    "vocal-demo:Vocal": "Record your vocal here",
    "vocal-demo:Instrumental": "Drop your instrumental here",
    "vocal-demo:Reference": "Drop a reference take here",
    "beat:Drums": "Record or drop drums here",
    "beat:Bass": "Record or drop bass here",
    "beat:Other": "Add other parts here",
    "voiceover:Narration": "Record your narration here",
    "voiceover:Bed": "Drop a background bed here"
}

export const nextActionHintForTrack = (tags: ReadonlyArray<string>, trackName: string): Option<string> =>
    readTemplateIdFromTags(tags).flatMap(templateId => Option.wrap(TrackHints[`${templateId}:${trackName}`]))

export const projectEmptyTimelineHint = (tags: ReadonlyArray<string>): string => {
    const templateId = readTemplateIdFromTags(tags)
    return templateId.match({
        none: () => "Drop instruments or samples here",
        some: (id) => {
            switch (id) {
                case "podcast": return "Record Voice, or drop Music onto a track"
                case "vocal-demo": return "Record Vocal, or drop Instrumental / Reference"
                case "beat": return "Build your beat on Drums, Bass, or Other"
                case "voiceover": return "Record Narration, or drop a Bed"
                default: return "Drop instruments or samples here"
            }
        }
    })
}
