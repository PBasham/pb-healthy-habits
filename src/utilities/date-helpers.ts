const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export const getDate = (): Date => { return new Date() }

export const matchesToday = (date: string | Date | number) => {

    let dateTracked = new Date(date)
    const todaysDate = new Date()

    const dateMatch = dateTracked.getDate() == todaysDate.getDate()
    const monthMatch = dateTracked.getMonth() == todaysDate.getMonth()
    const yearMatch = dateTracked.getFullYear() == todaysDate.getFullYear()

    return dateMatch && monthMatch && yearMatch
}

export const formatDate = (date: Date | undefined): string => {
    console.log("Entered formatDate() =====")

    if (!date || date == undefined) return ""


    const mm = (date.getMonth() + 1).toString().padStart(2, "0")
    const dd = date.getDate().toString().padStart(2, "0")
    const yyyy = date.getFullYear()
    
    return `${mm}/${dd}/${yyyy}`
}
export const formatDateWithTime = (date: Date | undefined): string => {
    if (!date) return ""
    const mm = (date.getMonth() + 1).toString().padStart(2, "0")
    const dd = date.getDate().toString().padStart(2, "0")
    const yyyy = date.getFullYear()

    const time = converTimeToAMPM(date)
    return `${mm}/${dd}/${yyyy} ${time}`
}

export const formatDateNamed = (date: Date | undefined): string => {
    console.log("Entered formatDateNamed() =====")

    if (!date) return ""

    if (typeof date == "string") date = new Date(date)
    
    const mm = date.getMonth()
    const dd = date.getDay()
    const yyyy = date.getFullYear()

    let dayName = dayNames[dd]
    let monthName = monthNames[mm]

    return `${dayName}, ${monthName} ${yyyy}`
}

export const formatDateNamedAndTime = (date: Date | undefined): string => {
    console.log("Entered formatDateNamedAndTime() =====")

    if (!date) return ""

    if (typeof date == "string") date = new Date(date)
    
    const mm = date.getMonth()
    const dd = date.getDay()
    const yyyy = date.getFullYear()

    let dayName = dayNames[dd]
    let monthName = monthNames[mm]

    const time = converTimeToAMPM(date)

    return `${dayName}, ${monthName} ${yyyy} ${time}`
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