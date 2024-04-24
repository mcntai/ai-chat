export enum ACTIVE_AI_TYPE {
  TEXT_GENERATOR = 'textGenerator',
  IMAGE_GENERATOR = 'imageGenerator',
  IMAGE_SCANNER = 'imageScanner',
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

export const AVAILABLE_FILE_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'heif', 'heic'];