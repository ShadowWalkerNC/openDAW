import {InstrumentFactories} from "@opendaw/studio-adapters"
import {Project, ProjectEnv} from "@opendaw/studio-core"
import {ProjectTemplate} from "@/project/ProjectTemplateCatalog"

export type {ProjectTemplate, ProjectTemplateId} from "@/project/ProjectTemplateCatalog"
export {ProjectTemplates, projectMetaNameForTemplate} from "@/project/ProjectTemplateCatalog"

export const createProjectFromTemplate = (env: ProjectEnv, template: ProjectTemplate): Project => {
    const project = Project.new(env)
    if (template.trackNames.length === 0) {return project}
    project.editing.modify(() => {
        for (const trackName of template.trackNames) {
            project.api.createInstrument(InstrumentFactories.Tape, {name: trackName})
        }
    })
    project.editing.markSaved()
    return project
}
