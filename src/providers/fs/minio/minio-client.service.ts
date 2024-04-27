import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { MinioConfigService } from 'config/fs/minio/config.service';
import { toArray } from 'common/utils/array';

interface UploadParams {
  data: Buffer;
  contentType: string;
  path: string;
}

@Injectable()
export class MinioClientService {
  private readonly bucketName: string;
  private readonly host: string;
  private readonly port: number;

  public get client() {
    return this.minio.client;
  }

  constructor(
    private readonly config: MinioConfigService,
    private readonly minio: MinioService,
  ) {
    this.bucketName = this.config.bucket;
    this.host = this.config.host;
    this.port = this.config.port;
  }

  public async upload(params: UploadParams): Promise<string> {
    const { data, path, contentType } = params;

    await this.client.putObject(this.bucketName, path, data, { 'Content-Type': contentType })
      .catch(err => {
        throw new Error('Failed to upload file ' + err.message);
      });

    return `https://${this.host}:${this.port}/${this.bucketName}/${path}`;
  }

  async delete(objetName: string | string[]) {
    await this.client.removeObjects(this.bucketName, toArray(objetName))
      .catch(err => {
        throw new Error('Failed to delete file ' + err.message);
      });
  }

  async listObjects(prefix: string): Promise<string[]> {
    const stream = await this.client.listObjectsV2(this.bucketName, prefix, true);

    const names = [];

    for await (const chunk of stream) {
      names.push(chunk.name);
    }

    stream.on('error', err => {
      throw new Error('Failed to list objects ' + err.message);
    });

    return names;
  }
}
