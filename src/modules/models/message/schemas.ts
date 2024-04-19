import { object, oneOf } from 'sito';
import { ACTIVE_AI_TYPE } from 'common/constants/message';

export const activeAssistantConfigSchema = object({
  aiType: oneOf(Object.values(ACTIVE_AI_TYPE)).required(),
}).required().notEmpty();