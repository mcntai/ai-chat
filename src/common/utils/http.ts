import { Extension } from 'common/utils/fs';
import { invert } from 'common/utils/object';
import * as assert from 'assert';

const { CSV, GIF, JPEG, JPG, PNG, SVG, TIFF, ICO, WBMP, WEBP, PDF, XLS, XLSX, XML, TXT } = Extension;

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
  [PDF]:  'application/pdf',
  [XLS]:  'application/vnd.ms-excel',
  [XLSX]: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  [XML]:  'application/xml',
  [TXT]:  'text/plain',
};

export const getContentTypeByExtension = extension => {
  const contentType = ContentTypeByExtension[extension];

  assert(contentType, `Unknown extension: ${extension}`);

  return contentType;
};

export const getExtensionByContentType = contentType => {
  const extension = invert(ContentTypeByExtension)[contentType];

  assert(extension, `Unknown content type: ${contentType}`);

  return extension;
};