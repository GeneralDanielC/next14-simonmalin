export const formatDateWithTime = (date: Date) => {
    return new Date(date).toLocaleString("sv-SE", { weekday: "long", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
}