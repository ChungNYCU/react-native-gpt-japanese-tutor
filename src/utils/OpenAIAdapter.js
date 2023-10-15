import OpenAI from 'openai'
import Prompt from '../utils/Prompt'
import AppConfig from '../../config'

class OpenAIAdapter extends OpenAI {
  constructor(inputKey) {
    super({ apiKey: inputKey })
    this.baseURL = AppConfig.BASE_URL
    this.buildURL = (path) => `${this.baseURL}${path}`
  }

  getVocabularyDetails = async (Vocabulary) => {
    const completion = await this.completions.create(
      this.getRequestBody(Prompt.vocabulary(Vocabulary)),
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
