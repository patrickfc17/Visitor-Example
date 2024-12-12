import { DirInfo } from '../../../../Contracts/Visitor'
import { getDirectories } from '../../../data/directory'
import { ReportVisitor } from '../../../ReportVisitor'
import { GetDirectoriesResponse } from '../definitions/GetDirectoriesResponse'

type PortCallback = (
  err: any,
  result: GetDirectoriesResponse,
  rawResponse: any,
  soapHeader: any,
  rawRequest: any
) => string

export default {
  GetDirectories: async (
    getDirectoriesRequest = {},
    callback: PortCallback | null = null
  ) => {
    let data: DirInfo[] | null = null

    try {
      const dirs = await getDirectories()

      data = dirs.reduce((acc, dir) => {
        acc.push(dir.accept(ReportVisitor.instance()))
        return acc
      }, new Array<DirInfo>())
    } catch (err: unknown) {
      return callback && callback(err, { data: [] }, null, {}, getDirectoriesRequest)
    }

    return (
      callback &&
      callback(
        null,
        { data },
        data,
        { 'Content-Type': 'application/xml' },
        getDirectoriesRequest
      )
    )
  },
}
