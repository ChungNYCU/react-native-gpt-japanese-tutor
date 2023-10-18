import i18n from '../locales/i18n'

class Prompt {
  constructor() {}

  static vocabulary = (userInput) => {
    const language = i18n.t(i18n.locale)
    return `Generate a JSON representation of the Japanese vocabulary: ${userInput}; 
    if ${userInput} is not Japanese, translate it to Japanese; 
      {
        "basic": {
          "vocabulary": "Japanese vocabulary go here",
          "type": "[Type goes here]",
          "pronunciation-hiragana": "[Pronunciation by hiragana goes here]",
          "pronunciation-romaji": "[Pronunciation by romaj goes here]",
        },
        "detail": {
          "definition": "[Definition goes here and translate it to ${language}]",
          "sample-sentences": [(list me 5 sample sentences by this vocabulary)
            {
            "sentence": "[Sentence goes here]",
            "pronunciation-hiragana": "[Sentence pronunciation by hiragana goes here]",
            "pronunciation-romaji": "[Sentence pronunciation by romaj goes here]",
            "translation": "[Sentence translation in ${language} goes here]",
            }
          ]
          "grammatical-tenses": [(List all potential tenses by this vocabulary)
            {
              "form": "[Form 1]", 
              "variation": "[Variation 1]", 
              "pronunciation-hiragana": "[Variation1 pronunciation by hiragana goes here]", 
              "pronunciation-romaji": "[Variation1 by romaj goes here]"
            },
          ]
        }
      }`
  }
}

export default Prompt
