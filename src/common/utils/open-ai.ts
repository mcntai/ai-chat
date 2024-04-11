import { encoding_for_model, TiktokenModel } from 'tiktoken';

export const countTokensFromString = (string: string, model: TiktokenModel): number => {
  const encoding = encoding_for_model(model);

  const tokensCount = encoding.encode(string);

  encoding.free();

  return tokensCount.length;
};