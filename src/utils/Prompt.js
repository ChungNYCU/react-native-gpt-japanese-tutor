import i18n from '../locales/i18n'
import { locales } from '../locales/locales'

class Prompt {
  constructor() {}

  static systemRolePrompt = () => {
    return `You are a Japanese teacher, proficient in words, phrases, and grammar; 
    For example, you can tell that '食べる' and 'ドア' are vocabulary 
    and 'あなたは食べたいですか' is a sentence. \n
    `
  }

  static systemLanguagePrompt = () => {
    const language = i18n.t(i18n.locale)
    return `Your student is using ${language} to learn Japanese, 
    so please explain details in ${language}. \n
    `
  }

  static classifier = (userInput) => {
    const prompt =
      this.systemRolePrompt() +
      `What is """${userInput}""" belong with? 
      """DO NOT explain""" anything, select a option.  
      1. Vocabulary    
      2. Sentence`
    return prompt
  }

  static sentence = (userInput) => {
    const language = i18n.t(i18n.locale)
    const prompt =
      this.systemRolePrompt() +
      this.systemLanguagePrompt() +
      `Generate a JSON representation of the Japanese sentence: ${userInput};
      if """${userInput}""" not Japanese, translate it to Japanese first.
    {
      "sentence": "[${userInput} in Japanese goes here]",
      "translation": "[Sentence translation in ${language} goes here]",
      "pronunciation-hiragana": "[Sentence pronunciation by hiragana goes here]",
      "pronunciation-romaji": "[Sentence pronunciation by romaj goes here]",
      "grammar": "[Explain the sentence's Japanese grammar in ${language} goes here]"
    }
    `
    return prompt
  }

  static vocabulary = (userInput) => {
    const language = i18n.t(i18n.locale)
    const prompt =
      this.systemRolePrompt() +
      this.systemLanguagePrompt() +
      `Generate a JSON representation of the Japanese vocabulary: ${userInput}; 
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
          "sample-sentences": [(if the vocabulary has different meaning, generate sample sentence for each.)
            {
            "sentence": "[Sentence goes here]",
            "pronunciation-hiragana": "[Sentence pronunciation by hiragana goes here]",
            "pronunciation-romaji": "[Sentence pronunciation by romaj goes here]",
            "translation": "[Sentence translation in ${language} goes here]",
            }
          ],
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
    return prompt
  }
}

export default Prompt
