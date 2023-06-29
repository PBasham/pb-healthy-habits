import AsyncStorage from "@react-native-async-storage/async-storage";
import { Emotion, EmotionLog, LoggedEmotion } from "../interfaces";

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
    console.log("result of getEmotionLog: ", result)

    if (!result) return []

    let emotionLog: LoggedEmotion[] = JSON.parse(result)
    if (!emotionLog) {
        return []
    }

    return emotionLog
}

// store


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
