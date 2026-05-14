/**
 * Versions stamped onto build artifacts for traceability (architecture
 * committee, safety wrapper). Bump each on the change noted below so every
 * generated file and rendered video is traceable to the inputs behind it.
 */
export const VERSIONS = {
  /** Shape of VUSVideoParams — bump on a breaking change to params/types.ts. */
  schema: "1.0.0",
  /** Scene composition — bump when scene structure or timing changes. */
  remotionTemplate: "1.0.0",
  /** edge-tts voice used to generate the narration. */
  ttsVoice: "he-IL-HilaNeural",
} as const;
