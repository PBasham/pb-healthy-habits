import AsyncStorage from "@react-native-async-storage/async-storage";
import { Emotion, LoggedEmotion, LoggedOverallEmotion } from "../interfaces";

import * as dateHelpers from "../utilities/date-helpers"
//* AsyncStorage.getItem("nameofitem") -> I need to be parsed with JSON.parse(resultOfGet)
//* AsyncStorage.setItem("nameforitem", item)


/** //h AsyncStorage Items
 * * EmotionLog
 * 
 */


/**
 * @description This gets the users emotionLog from async storage.
 * @returns EmotionLog
 * 
 * EmotionLog is an array of LoggedEmotion {
 * 
 * / Time of creation
 * createdAt: Date
 * 
 * / Last time updated.
 * 
 * updatedAt: Date
 * 
 * / Time this emotion happened/was tracked
 * 
 * timeTracked: Date
 * 
 * / Emotion user is feeling
 * 
 * emotion: Emotion | UserEmotion
 * 
 * / Short message for what was happening or why you might be feeling this way.
 * 
 * feelingSummary ?: string
 * 
 * }
 */
export async function getMoodLog(): Promise<LoggedEmotion[]> {
    let result: string | null = await AsyncStorage.getItem("Emotion-Log")
    // console.log("result of getEmotionLog: ", result)

    if (!result) return []

    let emotionLog: LoggedEmotion[] = JSON.parse(result)
    if (!emotionLog) {
        return []
    }

    return emotionLog
}

// store

/**
 * 
 * @param emotionLog current state of the EmotionLog
 * @returns A boolean indicating success.
 */
export async function storeMoodLog(emotionLog: LoggedEmotion[]): Promise<boolean> {
    console.log("Entered storeEmotionLog ==========")

    try {
        let result = await AsyncStorage.setItem("Emotion-Log", JSON.stringify(emotionLog))
        console.log(result)
    } catch (error) {
        console.log("Set for Emotion-Log failed.")
        console.log(error)
        return false
    }

    return true
}

/**
 * 
 * @param newEntry new entry to add to the EmotionLog
 * @param emotionLog current state of the EmotionLog
 * @returns An updated EmotionLog
 */
export async function addEntryToMoodLog(newEntry: LoggedEmotion, emotionLog: LoggedEmotion[]): Promise<LoggedEmotion[]> {
    console.log("Entered addEntryToEmotionLog() ====================")
    let updatedLog = [...emotionLog, newEntry]

    storeMoodLog(updatedLog)

    return updatedLog

}
/**
 * 
 * @param updatedEntry The entry that will be udpated
 * @param emotionLog current state of the EmotionLog
 * @returns An updated EmotionLog
 */
export async function updateEntryInMoodLog(updatedEntry: LoggedEmotion, emotionLog: LoggedEmotion[]) {
    console.log("Entered updateEntryInEmotionLog() ====================")
    let currentLog = [...emotionLog]

    let updatedLog = [...currentLog.filter((log) => log.id != updatedEntry.id), updatedEntry]

    storeMoodLog(updatedLog)
    
    return updatedLog
}
/**
 * 
 * @param entryToRemove Entry that will be removed from EmotionLog
 * @param emotionLog current state of EmotionLog
 * @returns An updated EmotionLog
 */
export async function removeEntryFromMoodLog(entryToRemove: LoggedEmotion, emotionLog: LoggedEmotion[]) {
    console.log("Entered removeEntryFromEmotionLog() ====================")
    let currentLog = [...emotionLog]

    let updatedLog = [...currentLog.filter((log) => log.id != entryToRemove.id)]

    storeMoodLog(updatedLog)

    return updatedLog
}

/** 
 * * Overall Mood
 */
/**
 * @description This gets the users emotionLog from async storage.
 * @returns EmotionLog
 * 
 * EmotionLog is an array of LoggedEmotion {
 * 
 * / Time of creation
 * createdAt: Date
 * 
 * / Last time updated.
 * 
 * updatedAt: Date
 * 
 * / Time this emotion happened/was tracked
 * 
 * timeTracked: Date
 * 
 * / Emotion user is feeling
 * 
 * emotion: Emotion | UserEmotion
 * 
 * / Short message for what was happening or why you might be feeling this way.
 * 
 * feelingSummary ?: string
 * 
 * }
 */
export async function getOverallMood(): Promise<LoggedOverallEmotion | null> {
    console.log("Entered getOverallMood() =====")
    let result: string | null = await AsyncStorage.getItem("Overall-Mood-Log")
    
    if (!result) return null

    let overallMoodLog: LoggedOverallEmotion[] = JSON.parse(result)

    console.log("overallMoodLog: ", overallMoodLog)
    
    let filteredOverallMoodLog: LoggedOverallEmotion[] = overallMoodLog.filter((overallMood) => {
        if (dateHelpers.formatDate(overallMood.dateTracked) == dateHelpers.formatDate(dateHelpers.getDate())) {
            return overallMood
        }
    })
    console.log("filteredOverallMoodLog: ", filteredOverallMoodLog)
    
    if(!filteredOverallMoodLog || filteredOverallMoodLog.length) return null
    
    const todaysOverallMood: LoggedOverallEmotion = filteredOverallMoodLog[0]
    console.log("todaysOverallMood: ", todaysOverallMood)

    if (!todaysOverallMood) return null

    return todaysOverallMood
}

// store

/**
 * 
 * @param overallMood current state of the EmotionLog
 * @returns A boolean indicating success.
 */
export async function storeOverallMood(overallMood: LoggedOverallEmotion): Promise<boolean> {
    console.log("Entered storeOverallMood ==========")
    //TODO - Add incoming Overall Mood to the list of Overall mood logs.
    //todo 1. Get overall mood log.
    const result: string | null = await AsyncStorage.getItem("Overall-Mood-Log")
    
    if (!result) return false

    const overallMoodLog: LoggedOverallEmotion[] = JSON.parse(result)
    console.log("overallMoodLog: ", overallMoodLog)
    //todo 2. filter current overallMoodLog without log for today.
    //todo 3. add incoing overall mood to log.
    const updatedOverallMoodLog: LoggedOverallEmotion[] = [
        ...overallMoodLog.filter((log) => {
            if ( dateHelpers.formatDate(log.dateTracked) !== dateHelpers.formatDate(overallMood.dateTracked)) return log
        }),
        overallMood
    ]
    console.log("updatedOverallMoodLog: ", updatedOverallMoodLog)
    //todo 4. store new overall mood log.
    try {
        let result = await AsyncStorage.setItem("Overall-Mood-Log", JSON.stringify(updatedOverallMoodLog))
        console.log("result: ", result)
    } catch (error) {
        console.log("Set for Emotion-Log failed.")
        console.log(error)
        return false
    }

    return true
}


/**
 * 
 * @param entryToRemove Entry that will be removed from EmotionLog
 * @param emotionLog current state of EmotionLog
 * @returns An updated EmotionLog
 */
export async function removeOverallMoodFromOverallMoodLog(entryToRemove: LoggedOverallEmotion): Promise<boolean> {
    console.log("Entered removeOverallMoodFromOverallMoodLog() ====================")
    let result: string | null = await AsyncStorage.getItem("Overall-Mood-Log")
    
    if (!result) return false

    let overallMoodLog: LoggedOverallEmotion[] = JSON.parse(result)

    console.log("overallMoodLog: ", overallMoodLog)

    let updatedOverallMoodLog = [...overallMoodLog.filter((log) => log.id != entryToRemove.id)]

    try {
        let result = await AsyncStorage.setItem("Overall-Mood-Log", JSON.stringify(updatedOverallMoodLog))
        console.log("result: ", result)
    } catch (error) {
        console.log("Set for Emotion-Log failed.")
        console.log(error)
        return false
    }
    

    return true
}