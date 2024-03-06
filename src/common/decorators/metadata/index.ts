import { SetMetadata } from '@nestjs/common';

export const GuardParams = (data: any) => SetMetadata('guardParams', data);
