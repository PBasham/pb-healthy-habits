export interface JournalEntry {
    createdAt: Date
    updatedAt: Date

    category: string,

    tags: string[]

    title: string
    message: string

    emotions: Emotion[]

}

export type Emotion = "happy" | "caring" | "greatful" | "excited" | "loved" | "Respected" | "valued" | "accepted" | "confident" | "brave" | "hopeful" | "powerful" | "playful" | "creative" | "curious" | "affectionate" | "embarrassed" | "guilty" | "excluded" | "ashamed" | "angry" | "annoyed" | "jealous" | "bored" | "scared" | "overwhelmed" | "powerless" | "anxious" | "sad" | "disappointed" | "hurt" | "lonely" | string | undefined

export type userEmotion = string