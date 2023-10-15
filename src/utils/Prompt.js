class Prompt {
  constructor() {}

  static vocabulary = (
    userInput,
  ) => `Generate a JSON representation of the vocabulary: ${userInput}
    {
      "basic": {
        "pronunciation": "[Pronunciation goes here]",
        "type": "[Type goes here]"
      },
      "detail": {
        "definition": "[Definition goes here]",
        "sample sentence": [list me 5 sample sentences by this vocabulary (Sentence pronunciation goes here)],
        "grammatical tense": [
          {"form": "[Form 1]", "variation": "[Variation 1 (Variation1 pronunciation goes here)]"},
          {"form": "[Form 2]", "variation": "[Variation 2 (Variation2 pronunciation goes here)]"},
          {"form": "[Form 3]", "variation": "[Variation 3 (Variation3 pronunciation goes here)]"},
          {"form": "[Form 4]", "variation": "[Variation 4 (Variation4 pronunciation goes here)]"}
        ]
      }
    }`
}

export default Prompt
