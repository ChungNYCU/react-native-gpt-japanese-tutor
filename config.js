const AppConfig = {
  // constants for override OpenAI's attributes
  BASE_URL: 'https://api.openai.com/v1',

  // constants for generate request body
  MODEL: 'gpt-3.5-turbo-instruct',
  MAX_TOKENS: 2000,
  TEMPERATURE: 0,

  // data types
  VOCABULARY: '1',
  SENTENCE: '2',
  QUESTION: '3',
  OTHER: '4',

  DB_NAME: 'gpttutor.db',
  TABLE_NAME: 'Chat',
}

export default AppConfig
