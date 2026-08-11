import css from "./RegionLane.sass?inline"
import {Html} from "@opendaw/lib-dom"
import {Lifecycle} from "@opendaw/lib-std"
import {createElement} from "@opendaw/lib-jsx"
import {RegionRenderer} from "@/ui/timeline/tracks/audio-unit/regions/RegionRenderer.ts"
import {AudioUnitBoxAdapter, TrackBoxAdapter} from "@opendaw/studio-adapters"
import {TracksManager} from "@/ui/timeline/tracks/audio-unit/TracksManager.ts"
import {CanvasPainter, TimelineRange} from "@opendaw/studio-core"
import {nextActionHintForTrack} from "@/project/ProjectTemplateHints"

const className = Html.adoptStyleSheet(css, "RegionLane")

type Construct = {
    lifecycle: Lifecycle
    trackManager: TracksManager
    range: TimelineRange
    adapter: TrackBoxAdapter
}

export const RegionLane = ({lifecycle, trackManager, range, adapter}: Construct) => {
    let updated = false
    let visible = false
    const canvas: HTMLCanvasElement = <canvas/>
    const hint: HTMLElement = <div className="empty-hint"/>
    const element: HTMLElement = (<div className={className}>{canvas}{hint}</div>)
    const painter = lifecycle.own(new CanvasPainter(canvas, ({context}) => {
        if (visible) {
            RegionRenderer.render(context, trackManager, range, adapter.listIndex)
            updated = true
        }
    }))
    const requestUpdate = () => {
        updated = false
        painter.requestUpdate()
    }
    const refreshHint = () => {
        const empty = adapter.regions.collection.isEmpty()
        element.classList.toggle("is-empty", empty)
        if (!empty) {
            hint.textContent = ""
            return
        }
        const unitAdapter = trackManager.service.project.boxAdapters
            .adapterFor(adapter.audioUnit, AudioUnitBoxAdapter)
        const tags = trackManager.service.hasProfile ? trackManager.service.profile.meta.tags : []
        const hintText = nextActionHintForTrack(tags, unitAdapter.label)
        hint.textContent = hintText.unwrapOrElse("Drop audio here")
        hint.classList.toggle("guided", hintText.nonEmpty())
    }
    const {timelineFocus} = trackManager.service.project
    lifecycle.ownAll(
        range.subscribe(requestUpdate),
        adapter.regions.subscribeChanges(() => {
            requestUpdate()
            refreshHint()
        }),
        adapter.enabled.subscribe(requestUpdate),
        trackManager.service.project.timelineBoxAdapter.catchupAndSubscribeSignature(requestUpdate),
        timelineFocus.track.catchupAndSubscribe(owner =>
            element.classList.toggle("focused", owner.contains(adapter))),
        trackManager.service.projectProfileService.catchupAndSubscribe(() => refreshHint()),
        Html.watchIntersection(element, entries => entries
                .forEach(({isIntersecting}) => {
                    visible = isIntersecting
                    if (!updated) {
                        painter.requestUpdate()
                    }
                }),
            {root: trackManager.scrollableContainer})
    )
    refreshHint()
    return element
}
