import OpenAI from 'openai'
import Prompt from './Prompt'
import AppConfig from '../../config'

class OpenAIAdapter extends OpenAI {
  constructor(inputKey) {
    super({ apiKey: inputKey })
    this.baseURL = AppConfig.BASE_URL
    this.buildURL = (path) => `${this.baseURL}${path}`
  }

  getInputType = async (userInput) => {
    const completion = await this.completions.create(
      this.getRequestBody(Prompt.classifier(userInput)),
    )
    const type = completion.choices[0]?.text.trim()[0]
    return type // 1 = Vocabulary, 2 = Sentence
  }

  getSentenceDetails = async (sentence) => {
    const completion = await this.completions.create(
      this.getRequestBody(Prompt.sentence(sentence)),
    )
    return completion.choices[0].text.trim()
  }

  getVocabularyDetails = async (vocabulary) => {
    const completion = await this.completions.create(
      this.getRequestBody(Prompt.vocabulary(vocabulary)),
    )
    return completion.choices[0].text.trim()
  }

  getRequestBody = (inputPrompt) => {
    return {
      model: AppConfig.MODEL,
      prompt: inputPrompt,
      max_tokens: AppConfig.MAX_TOKENS,
      temperature: AppConfig.TEMPERATURE,
    }
  }
}

export default OpenAIAdapter
