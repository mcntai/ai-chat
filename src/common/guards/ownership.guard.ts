import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { argumentsAssert } from 'common/errors';
import { CommonService } from 'modules/common/common.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly commonService: CommonService,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const guardParams: any = this.reflector.get<any>('guardParams', context.getClass());

    if (!guardParams) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;

    const pathParams = request.params;
    const queryParams = request.query;
    const bodyParams = request.body;

    const recordId = pathParams[guardParams.reqIdentifier]
      || queryParams[guardParams.reqIdentifier]
      || bodyParams[guardParams.reqIdentifier];

    const column: string = guardParams.column;
    const whereClause: Record<string, any> = guardParams.whereClause || {};

    const recordExists = await this.commonService.entityExists(
      guardParams.repository,
      { [column]: recordId, 'owner.id': userId, ...(whereClause) });

    argumentsAssert(recordExists, `Record with such ${guardParams.reqIdentifier} was not found`);

    return true;
  }
}
