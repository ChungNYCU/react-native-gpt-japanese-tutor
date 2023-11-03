import AppConfig from '../../config'
import i18n from '../locales/i18n'

class Prompt {
  constructor() {}

  static systemRolePrompt = () => {
    return `You are a Japanese teacher, proficient in words, phrases, grammar, and general knowledge about Japan; 
    For example, you can tell that '食べる' and 'ドア' are vocabulary, 
    'あなたは食べたいですか' is a sentence, 
    and '解釋五段動詞', '什麼是鯛魚燒', 'What is AKB48 in Japan?' is question what your student want to ask about.
     \n
    You also a expert on JSON format, so please avoid these exceptions: 
    SyntaxError: JSON Parse error: Unexpected character: i,
    SyntaxError: JSON Parse error: Expect a string key in JSON object,
    SyntaxError: JSON Parse error: Unexpected end of input,
    SyntaxError: JSON Parse error: U+0000 thru U+001F is not allowed in string;
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
      2. Sentence
      3. General Question about Japanese`
    return prompt
  }

  static vocabulary = (userInput) => {
    const language = i18n.t(i18n.locale)
    const prompt =
      this.systemRolePrompt() +
      this.systemLanguagePrompt() +
      `Generate a JSON representation of the Japanese vocabulary: """${userInput}"""; 
      if """${userInput}""" is not Japanese, translate it to Japanese and then do futher processes; 
    {
      "type": "${AppConfig.VOCABULARY}",
      "basic": {
        "vocabulary": "[Japanese vocabulary go here]",
        "type": "[Type goes here]",
        "pronunciation-hiragana": "[Pronunciation by hiragana goes here]",
        "pronunciation-romaji": "[Pronunciation by romaj goes here]"
      },
      "detail": {
        "definition": "[Definition goes here and translate it to ${language}]",
        "sample-sentences": [(if the vocabulary has different meaning, generate sample sentence for each.)
          {
          "sentence": "[Sentence goes here]",
          "pronunciation-hiragana": "[Sentence pronunciation by hiragana goes here]",
          "pronunciation-romaji": "[Sentence pronunciation by romaj goes here]",
          "translation": "[Sentence translation in ${language} goes here]"
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

  static sentence = (userInput) => {
    const language = i18n.t(i18n.locale)
    const prompt =
      this.systemRolePrompt() +
      this.systemLanguagePrompt() +
      `Generate a JSON representation of the Japanese sentence: """${userInput}""";
      if """${userInput}""" not Japanese, translate it to Japanese first.
    {
      "type": "${AppConfig.SENTENCE}",
      "sentence": "["""${userInput}""" in Japanese goes here]",
      "translation": "[Sentence translation in ${language} goes here]",
      "pronunciation-hiragana": "[Sentence pronunciation by hiragana goes here]",
      "pronunciation-romaji": "[Sentence pronunciation by romaj goes here]",
      "grammar": "[Fill the content with plain text by using ${language} to explain the Japanese grammar of the whole sentence in detail and also briefly define every vocabulary.]",
      "keywords" "[[All related Japanese vocabulary go here as a array]]"
    }
    `
    return prompt
  }

  static question = (userInput) => {
    const language = i18n.t(i18n.locale)
    const prompt =
      this.systemRolePrompt() +
      this.systemLanguagePrompt() +
      `Generate a JSON representation of the Japanese sentence: """${userInput}""";
      if """${userInput}""" not Japanese, translate it to Japanese first.
    {
      "type": "${AppConfig.QUESTION}",
      "markdown": "[answer in ${language} for """${userInput}""" in markdown format goes here]",
      "keywords" "[[All related Japanese vocabulary go here as a array]]"
    }
    `
    return prompt
  }

  
}

export default Prompt
