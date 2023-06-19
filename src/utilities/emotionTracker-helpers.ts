import AsyncStorage from "@react-native-async-storage/async-storage";
import { EmotionLog } from "../interfaces";

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
export async function getEmotionLog(): Promise<EmotionLog | null> {
    let result: string | null = await AsyncStorage.getItem("Emotion-Log")
    console.log("result of getEmotionLog: ", result)

    if (!result) return null

    let emotionLog: EmotionLog = JSON.parse(result)
    if (!emotionLog) {
        return null
    }

    return emotionLog
}

// store


export async function storeEmotionLog(emotionLog: EmotionLog): Promise<boolean> {
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

//todo add entry to log
//todo update entry in log
//todo remove entry in log
