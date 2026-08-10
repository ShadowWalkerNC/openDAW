import css from "./Dashboard.sass?inline"
import {Lifecycle} from "@opendaw/lib-std"
import {createElement} from "@opendaw/lib-jsx"
import {StudioService} from "@/service/StudioService.ts"
import {Html} from "@opendaw/lib-dom"
import {Resources} from "@/ui/dashboard/Resources"
import {IntroTiles} from "@/ui/dashboard/IntroTiles"
import {ActionButtons} from "@/ui/dashboard/ActionButtons"
import {Backup} from "@/ui/dashboard/Backup"
import {Sponsors} from "@/ui/dashboard/Sponsors"
import {HelpFeedback} from "@/ui/dashboard/HelpFeedback"
import {Links} from "@/ui/dashboard/Links"
import {ProductBrand} from "@/product/branding"

const className = Html.adoptStyleSheet(css, "Dashboard")

type Construct = {
    lifecycle: Lifecycle
    service: StudioService
}

export const Dashboard = ({lifecycle, service}: Construct) => {
    document.title = ProductBrand.documentTitle
    return (
        <div className={className}>
            <div className="atmosphere" aria-hidden="true"/>
            <header className="hero">
                <div className="brand-mark"/>
                <h1>{ProductBrand.name}</h1>
                <p className="tagline">{ProductBrand.tagline}</p>
                <p className="support">{ProductBrand.support}</p>
                <ActionButtons lifecycle={lifecycle} service={service}/>
                <p className="credit">{ProductBrand.credit}</p>
            </header>
            <div className="main">
                <div className="panel">
                    <Resources lifecycle={lifecycle} service={service}/>
                </div>
                <div className="rail">
                    <HelpFeedback/>
                    <Backup service={service}/>
                    <Links/>
                    <Sponsors/>
                </div>
            </div>
            <IntroTiles/>
        </div>
    )
}
