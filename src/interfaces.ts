export interface JournalEntry {
    createdAt: Date // date entry was created
    updatedAt: Date // last time is was updated.

    category?: category, // todo need array stored in async-storage

    tags?: string[] // todo need array stored in async-storage

    title: string
    message: string // todo should there be a chacacter limit?

    emotions?: Emotion[]

    entryPassword?: string // todo Make converter for this.
    passwordType?: passwordType

}

export type Emotion = "happy" | "caring" | "greatful" | "excited" | "loved" | "Respected" | "valued" | "accepted" | "confident" | "brave" | "hopeful" | "powerful" | "playful" | "creative" | "curious" | "affectionate" | "embarrassed" | "guilty" | "excluded" | "ashamed" | "angry" | "annoyed" | "jealous" | "bored" | "scared" | "overwhelmed" | "powerless" | "anxious" | "sad" | "disappointed" | "hurt" | "lonely" | string | undefined

export type userEmotion = string | undefined

export type passwordType = "password" | "pin" | undefined

export type category = string | undefined