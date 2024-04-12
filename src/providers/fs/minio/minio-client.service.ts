import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { IntegrationError } from 'common/errors';
import { MinioConfigService } from 'config/fs/minio/config.service';

interface UploadParams {
  data: Buffer;
  contentType: string;
  path: string;
}

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

  public async upload(params: UploadParams): Promise<string> {
    const { data, path, contentType } = params;

    await this.client.putObject(this.bucketName, path, data, { 'Content-Type': contentType })
      .catch(err => {
        throw new IntegrationError('Failed to upload file ' + err.message);
      });

    return `${this.url}:${this.port}/${this.bucketName}/${path}`;
  }

  async delete(objetName: string) {
    await this.client.removeObjects(this.bucketName, [objetName])
      .catch(err => {
        throw new IntegrationError('Failed to delete file ' + err.message);
      });
  }
}
