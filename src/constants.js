import { initialWindowMetrics } from "react-native-safe-area-context"
import { faPlus, faSearch, faTrash, faChevronLeft, faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons"

const screen = {
    width: initialWindowMetrics.frame.width / 100,
    height: initialWindowMetrics.frame.height / 100,
    ...initialWindowMetrics.insets
}

const colors = {
    white: "#ffffff",
    lightGrey: "#dcd0f5", // mint tint
    lightPurple: "#af9cd6",
    mediumPurple: "#a47aff",
    darkPurple: "#5828b8"
}

const icons = {
    plus: faPlus,
    search: faSearch,
    trash: faTrash,
    leftArrow: faChevronLeft,
    share: faPaperPlane,
    cancel: faTimes
}

export {
    screen,
    colors,
    icons
}