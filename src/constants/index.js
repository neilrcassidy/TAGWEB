import { rare_badge_locked, normal_badge_locked, rare_badge_unlocked, normal_badge_unlocked } from "../assets/img"

export const badges = [
    {
        id: 1000,
        group: "general",
        title: "Title 1",
        description: "Description",
        points: 20,
        icon_locked: rare_badge_locked,
        icon_unlocked: rare_badge_unlocked,
        type: "rare"
    },
    {
        id: 1001,
        group: "general",
        title: "Title 2",
        description: "Description",
        points: 10,
        icon_locked: rare_badge_locked,
        icon_unlocked: rare_badge_unlocked,
        type: "rare"
    },
    {
        id: 1002,
        group: "general",
        title: "Title 3",
        description: "Description",
        points: 5,
        icon_locked: normal_badge_locked,
        icon_unlocked: normal_badge_unlocked,
        type: "normal"
    },
    {
        id: 1003,
        group: "general",
        title: "Title 4",
        description: "Description",
        points: 5,
        icon_locked: normal_badge_locked,
        icon_unlocked: normal_badge_unlocked,
        type: "normal"
    },
    {
        id: 1004,
        group: "general",
        title: "Title 5",
        description: "Description",
        points: 5,
        icon_locked: normal_badge_locked,
        icon_unlocked: normal_badge_unlocked,
        type: "normal"
    }
]