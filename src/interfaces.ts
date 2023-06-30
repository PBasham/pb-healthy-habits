//* Journaling --------------------------------------------------
/** Array of users journals */
export type Journals = Journal[]
/** A users Journal object */
export interface Journal {
    name: string // name for journal
    entries?: JournalEntry[] // array of journal entries for this Journal
    iconColor?: string // color for Journal's icon

    isPasswordProtected?: boolean // is this journal password protected.
    journalPassword?: string //TODO need to encode this, how?
    journalPin?: string
    passwordType?: PasswordType
}

export interface JournalEntry {
    createdAt: Date // date entry was created
    updatedAt: Date // last time is was updated.

    category?: Category, //TODO need array stored in async-storage

    tags?: string[] //TODO need array stored in async-storage

    title: string
    message: string //TODO should there be a chacacter limit?

    emotions?: Emotion[]

    isPasswordProtected?: string //TODO Make converter for this.
    passwordType?: PasswordType
    entryPassword?: string
    entryPin?: string

}
//* Mood Tracking --------------------------------------------------
// emotion tracke

export interface LoggedEmotion {
    /** Time of creation */
    id: string
    /** Time of creation */
    createdAt: Date
    /** Last time updated. */
    updatedAt: Date
    /** Time this emotion happened/was tracked */
    timeTracked: Date
    // Emotion user is feeling
    emotion: Emotion | UserEmotion
    /** Short message for what was happening or why you might be feeling this way. */
    feelingSummary?: string
}

//* Misc types --------------------------------------------------
// Emotion
export type Emotion = "happy" | "caring" | "greatful" | "excited" | "loved" | "Respected" | "valued" | "accepted" | "confident" | "brave" | "hopeful" | "powerful" | "playful" | "creative" | "curious" | "affectionate" | "embarrassed" | "guilty" | "excluded" | "ashamed" | "angry" | "annoyed" | "jealous" | "bored" | "scared" | "overwhelmed" | "powerless" | "anxious" | "sad" | "disappointed" | "hurt" | "lonely" | UserEmotion

// This is used to define a users custom entered emotion.
export type UserEmotion = string 
// object used to connect an emotion with a color.
export interface EmotionDetail {
    emotion: Emotion
    color?: string
}

// security
export type PasswordType = "password" | "pin" | undefined
// organization
export type Category = string | undefined
