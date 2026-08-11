import "./main.sass"
import workersUrl from "@opendaw/studio-core/workers-main.js?worker&url"
import workletsUrl from "@opendaw/studio-core/processors.js?url"
import wasmProcessorUrl from "@opendaw/studio-core-wasm/wasm-processor.js?url"
import wasmOfflineWorkerUrl from "@opendaw/studio-core-wasm/wasm-offline-worker.js?worker&url"
import {boot} from "@/boot"
import {initializeColors} from "@opendaw/studio-enums"
import {Browser} from "@opendaw/lib-dom"

if (Browser.isMobile()) {
    document.body.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100vh;padding:2em;text-align:center;font-family:Inter,system-ui,sans-serif;color:#f5f5f5;background:#121212">
        <div><h1 style="font-family:Geist,system-ui,sans-serif;margin:0 0 0.5em;color:#39ff14">Creator Desk</h1><p>Creator Desk needs a desktop browser.<br>Please open it on a computer.</p></div>
    </div>`
} else if (window.crossOriginIsolated) {
    const now = Date.now()
    initializeColors(document.documentElement)
    boot({
        workersUrl,
        workletsUrl,
        wasmProcessorUrl,
        wasmOfflineWorkerUrl
    }).then(() => console.debug(`Booted in ${Math.ceil(Date.now() - now)}ms`))
} else {
    alert("crossOriginIsolated must be enabled")
}