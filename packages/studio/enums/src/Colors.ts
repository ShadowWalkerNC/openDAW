import {Color} from "@opendaw/lib-std"

// Obsidian Sonic Lab (Stitch): neon green + cyan on charcoal
export const Colors = {
    white: new Color(0, 0, 100),
    blue: new Color(183, 100, 50),
    green: new Color(111, 100, 54),
    yellow: new Color(60, 100, 84),
    cream: new Color(45, 12, 88),
    orange: new Color(32, 100, 50),
    red: new Color(354, 100, 65),
    purple: new Color(280, 40, 70),
    bright: new Color(0, 0, 96),
    gray: new Color(0, 0, 78),
    dark: new Color(0, 0, 58),
    shadow: new Color(0, 0, 42),
    black: new Color(0, 0, 18),
    background: new Color(0, 0, 7),
    panelBackground: new Color(0, 0, 10),
    panelBackgroundBright: new Color(0, 0, 14),
    panelBackgroundDark: new Color(0, 0, 6)
}

export const initializeColors = (root: { style: { setProperty: (name: string, value: string) => void } }) => {
    Object.entries(Colors).forEach(([name, value]) => {
        const cssName = name.replace(/([A-Z])/g, "-$1").toLowerCase()
        root.style.setProperty(`--color-${cssName}`, value.toString())
    })
}
