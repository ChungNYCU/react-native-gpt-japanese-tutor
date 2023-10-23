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
    return completion.choices[0].text
  }

  getSentenceDetails = async (sentence) => {
    const completion = await this.completions.create(
      this.getRequestBody(Prompt.sentence(sentence)),
    )
    return completion.choices[0].text
  }

  getVocabularyDetails = async (vocabulary) => {
    const completion = await this.completions.create(
      this.getRequestBody(Prompt.vocabulary(vocabulary)),
    )
    return completion.choices[0].text
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
