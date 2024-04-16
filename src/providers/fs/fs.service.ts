import { Injectable } from '@nestjs/common';
import { MinioClientService } from 'providers/fs/minio/minio-client.service';
import { downloadFile, getContentTypeByExtension, getContentTypeByUrl } from 'common/utils/http';
import { getExtensionByContentType } from 'common/utils/http';
import * as assert from 'assert';
import { Extension } from 'common/utils/fs';

const JPG_CONTENT_TYPE = getContentTypeByExtension(Extension.JPG);

interface UploadParams {
  data?: Buffer;
  fileUrl?: string;
  extension?: string;
  contentType?: string;
  path: string;
}

@Injectable()
export class FsService {
  constructor(private readonly fsClient: MinioClientService) {
  }

  private saveFile(data: Buffer, path: string, contentType: string): Promise<string> {
    return this.fsClient.upload({ data, contentType, path });
  }

  private resolveContentType = params => {
    const { extension, fileUrl } = params;

    const contentType = extension
      ? getContentTypeByExtension(extension)
      : getContentTypeByUrl(fileUrl);

    return contentType || JPG_CONTENT_TYPE;
  };

  async upload(params: UploadParams): Promise<string> {
    let { data, fileUrl, path } = params;

    assert(data || fileUrl, 'file content or file url is required');

    if (!data) {
      data = await downloadFile(fileUrl);
    }

    const contentType = params.contentType || this.resolveContentType(params);

    const extension = getExtensionByContentType(contentType);

    return this.saveFile(data, `${path}${extension}`, contentType);
  }

  delete(objetName: string | string[]) {
    return this.fsClient.delete(objetName);
  }

  getFilesNames(prefix: string): Promise<string[]> {
    return this.fsClient.listObjects(prefix);
  }
}