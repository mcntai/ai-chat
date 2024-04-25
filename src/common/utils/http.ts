import { Extension } from 'common/utils/fs';
import { invert } from 'common/utils/object';
import * as assert from 'assert';
import { Readable } from 'stream';
import * as path from 'path';

const { CSV, GIF, JPEG, JPG, PNG, SVG, TIFF, ICO, WBMP, WEBP, PDF, XLS, XLSX, XML, TXT, BMP, HEIF, HEIC } = Extension;

export const ContentTypeByExtension = {
  [CSV]:  'text/csv',
  [GIF]:  'image/gif',
  [JPEG]: 'image/jpeg',
  [JPG]:  'image/jpeg',
  [PNG]:  'image/png',
  [SVG]:  'image/svg+xml',
  [TIFF]: 'image/tiff',
  [ICO]:  'image/vnd.microsoft.icon',
  [WBMP]: 'image/vnd.wap.wbmp',
  [WEBP]: 'image/webp',
  [BMP]:  'image/bmp',
  [HEIF]: 'image/heif',
  [HEIC]: 'image/heic',
  [PDF]:  'application/pdf',
  [XLS]:  'application/vnd.ms-excel',
  [XLSX]: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  [XML]:  'application/xml',
  [TXT]:  'text/plain',
};

const resolveExtensionByUrl = url => {
  const { pathname } = new URL(url);

  return path.extname(pathname);
};

export const getContentTypeByExtension = extension => {
  const contentType = ContentTypeByExtension[extension];

  assert(contentType, `Unknown extension: ${extension}`);

  return contentType;
};

export const getContentTypeByUrl = url => {
  const extension = resolveExtensionByUrl(url);

  return getContentTypeByExtension(extension);
};

export const getExtensionByContentType = contentType => {
  const extension = invert(ContentTypeByExtension)[contentType];

  assert(extension, `Unknown content type: ${contentType}`);

  return extension;
};

const getClient = async (url: string) => {
  return url.includes('https')
    ? await import('https')
    : await import('http');
};

export const getStream = async (urlOrOptions): Promise<Readable> => {
  const url = typeof urlOrOptions === 'string'
    ? urlOrOptions
    : urlOrOptions.protocol + '//' + urlOrOptions.host + urlOrOptions.path;

  const client = await getClient(url);

  return new Promise(resolve => client.get(urlOrOptions, resolve));
};

export const downloadFile = async (url: string): Promise<Buffer> => {
  const stream = await getStream(url);

  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
};