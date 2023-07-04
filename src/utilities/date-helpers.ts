const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export const getDate = (): Date => { return new Date() }
export const formatDate = (date: Date | undefined): string => {
    if (!date) return ""
    const mm = (date.getMonth() + 1).toString().padStart(2, "0")
    const dd = date.getDate().toString().padStart(2, "0")
    const yyyy = date.getFullYear()
    return `${mm}/${dd}/${yyyy}`
}

export const formatDateNamed = (date: Date | undefined): string => {
    if (!date) return ""

    const mm = (date.getMonth())
    const dd = date.getDay()
    const yyyy = date.getFullYear()

    let dayName = dayNames[dd]
    let monthName = monthNames[mm]

    return `${dayName}, ${monthName} ${yyyy}`
}

export const getNamedDayMonthYear = (): string => {

    let date = new Date()
    let monthName = monthNames[date.getMonth()]
    let dayName = dayNames[date.getDay()]

    return `${dayName}, ${monthName} ${date.getDate()}`
}

 // convert time to am/pm
 export const converTimeToAMPM = (time: Date | undefined) => {
    if (!time) return ""
    let hh: number = time.getHours()
    let m: number = time.getMinutes()
    let s: number = time.getSeconds()
    let tt: string = "AM"

    if (hh >= 12) {
        hh = hh - 12
        tt = "PM"
    }
    if (hh === 0) hh = 12
    return `${hh.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}${tt}`

}