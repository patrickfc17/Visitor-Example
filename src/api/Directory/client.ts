import {
  Client,
  IExOptions as ISoapExOptions,
  createClientAsync as soapCreateClientAsync,
} from 'soap'
import { GetDirectoriesResponse } from './definitions/GetDirectoriesResponse'
import DirectoryService from './services/DirectoryService'

export interface SoapClient extends Client {
  DirectoryService: typeof DirectoryService
  GetDirectoriesAsync(
    getDirectoriesRequest: {},
    options?: ISoapExOptions
  ): Promise<
    [
      result: GetDirectoriesResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any
    ]
  >
}

export function createClientAsync(
  ...args: Parameters<typeof soapCreateClientAsync>
): Promise<SoapClient> {
  return soapCreateClientAsync(args[0], args[1], args[2]) as any
}
