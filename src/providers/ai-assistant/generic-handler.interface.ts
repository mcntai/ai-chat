export interface GenericHandlerInterface {
  process(data: any): any;

  getConfig?(): any;
}