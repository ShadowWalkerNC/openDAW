import css from "./IntroTiles.sass?inline"
import {Html} from "@opendaw/lib-dom"
import {createElement, RouteLocation} from "@opendaw/lib-jsx"
import {IconSymbol} from "@opendaw/studio-enums"
import {Icon} from "@/ui/components/Icon"

const className = Html.adoptStyleSheet(css, "IntroTiles")

// Each tile links to its own page; the legend shows that destination. Topics reuse an existing page where one
// exists (Privacy -> /privacy), otherwise the manual under /manuals/<slug>.
type Tile = {
    icon: IconSymbol
    title: string
    text: string
    path: string
}

const tiles: ReadonlyArray<Tile> = [
    {
        icon: IconSymbol.Timeline,
        title: "Guided starts",
        text: "Begin with Podcast, Vocal Demo, Beat, or Voiceover. Sensible tracks, plain names, ready to record.",
        path: "/manuals/introduction"
    },
    {
        icon: IconSymbol.Connected,
        title: "Live rooms",
        text: "Share a link and edit the same session together. Useful for feedback, lessons, and quick collabs.",
        path: "/manuals/live-rooms"
    },
    {
        icon: IconSymbol.Book,
        title: "Learn by doing",
        text: "Built for creators who want results first. No account wall between you and your first export.",
        path: "/manuals/education"
    },
    {
        icon: IconSymbol.Lock,
        title: "Private by default",
        text: "Projects stay on your device. No signup, no tracking, no cloud upload unless you choose backup.",
        path: "/privacy"
    },
    {
        icon: IconSymbol.Code,
        title: "Open foundation",
        text: "Obsidian is built on openDAW. Inspect the source, self-host, or extend with your own devices.",
        path: "/manuals/open-source"
    }
]

export const IntroTiles = () => (
    <div className={className}>
        <div className="tiles">
            {tiles.map(({icon, title, text, path}) => (
                <div className="tile" onclick={() => RouteLocation.get().navigateTo(path)}>
                    <div className="tile-head">
                        <Icon symbol={icon}/>
                        <div className="tile-title">{title}</div>
                    </div>
                    <div className="tile-text">{text}</div>
                    <div className="tile-link">{path}</div>
                </div>
            ))}
        </div>
    </div>
)
