import { PipeTransform, Injectable } from '@nestjs/common';
import { argumentsAssert } from 'common/errors';
import * as FileType from 'file-type';
import { Express } from 'express';
import { Extension } from 'common/utils/fs';
import { getContentTypeByExtension } from 'common/utils/http';

const { GIF, JPEG, JPG, PNG, WEBP, BMP, HEIF, HEIC } = Extension;

const fileTypeRules = [
  {
    mime:      getContentTypeByExtension(JPG),
    signature: 'ffd8ffe000104a4649460001',
  },
  {
    mime:      getContentTypeByExtension(JPEG),
    signature: 'ffd8ffee',
  },
  {
    mime:      getContentTypeByExtension(PNG),
    signature: '89504e470d0a1a0a',
  },
  {
    mime:      getContentTypeByExtension(GIF),
    signature: '474946383761',
  },
  {
    mime:      getContentTypeByExtension(BMP),
    signature: '424d',
  },
  {
    mime:      getContentTypeByExtension(WEBP),
    signature: '52494646',
  },
  {
    mime:      getContentTypeByExtension(HEIF),
    signature: '6674797068656963667479706d',
  },
  {
    mime:      getContentTypeByExtension(HEIC),
    signature: '6674797068656963667479706d',
  },
];

@Injectable()
export class ImageTypeValidationPipe implements PipeTransform {
  async transform(value: Express.Multer.File) {
    const fileBuffer: Buffer = value.buffer;

    argumentsAssert(await this.hexSignatureValid(fileBuffer), 'Invalid image file type');

    return value;
  }

  private async hexSignatureValid(fileBuffer: Buffer): Promise<boolean> {
    const file = await FileType.fromBuffer(fileBuffer);

    if (!file || !file.mime) {
      return false;
    }

    const rule = fileTypeRules.find(rule => rule.mime === file.mime);

    if (rule) {
      const hexSignature = fileBuffer.toString('hex').slice(0, rule.signature.length);

      return hexSignature === rule.signature;
    }
  }
}