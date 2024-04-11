export enum ACTIVE_AI_TYPE {
  TEXT_GENERATOR = 'textGenerator',
  IMAGE_GENERATOR = 'imageGenerator',
  SCANNER = 'scanner',
}

export enum OPEN_AI_IMAGE_RESOLUTION {
  '256x256' = '256x256',
  '512x512' = '512x512',
  '1024x1024' = '1024x1024',
}

export enum ACTOR {
  USER = 'user',
  AI = 'assistant',
  SYSTEM = 'system',
}

export enum ATTACHMENT_TYPE {
  IMAGE = 'image',
  AUDIO = 'audio',
}