import { Stream } from 'openai/streaming';

type EventHandler = (...args: any[]) => void;

export class TextExtractorStream extends Stream<string | null> {
  private _eventHandlers: { [event: string]: EventHandler[] } = {};
  private _response: string[] = [];

  constructor(sourceStream: Stream<any>, extractor: (chunk: any) => string | null) {
    super(async function* (this: TextExtractorStream) {
      for await (const chunk of sourceStream) {
        const text = extractor(chunk) || '';

        this._response.push(text);

        yield text;
      }

      this.emit('end', this._response.join(''));
    }, sourceStream.controller);
  }

  on(event: string, handler: EventHandler) {
    if (!this._eventHandlers[event]) {
      this._eventHandlers[event] = [];
    }

    this._eventHandlers[event].push(handler);
  }

  emit(event: string, completeText: string) {
    if (this._eventHandlers[event]) {
      for (const handler of this._eventHandlers[event]) {
        handler(completeText);
      }
    }
  }
}