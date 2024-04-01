import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './file.model';
import { IntegrationError } from 'common/errors';
import { md5Hash } from 'common/utils/crypto';
import { getExtensionByContentType } from 'common/utils/http';
import { MinioConfigService } from 'config/fs/minio/config.service';

@Injectable()
export class MinioClientService {
  private readonly bucketName: string;
  private readonly url: string;
  private readonly port: number;

  public get client() {
    return this.minio.client;
  }

  constructor(
    private readonly config: MinioConfigService,
    private readonly minio: MinioService,
  ) {
    this.bucketName = this.config.bucket;
    this.url = this.config.endPoint;
    this.port = this.config.port;
  }

  public async upload(file: BufferedFile): Promise<string> {
    const hash: string = md5Hash(Date.now().toString());
    const extension: string = getExtensionByContentType(file.mimetype);
    const fileName: string = 'dev/' + hash + extension;
    const buffer: Buffer | string = file.buffer;
    const metaData = { 'Content-Type': file.mimetype };

    await this.client.putObject(this.bucketName, fileName, buffer, metaData)
      .catch(err => {
        throw new IntegrationError('Failed to upload file ' + err.stack);
      });

    return `${this.url}:${this.port}/${this.bucketName}/${fileName}`;
  }

  async delete(objetName: string) {
    await this.client.removeObjects(this.bucketName, [objetName])
      .catch(err => {
        throw new IntegrationError('Failed to delete file ' + err.stack);
      });
  }
}
