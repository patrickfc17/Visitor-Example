import { file } from 'bun'
import fastify from 'fastify'
import json2xml from 'json2xml'
import { env } from './lib/environment'
import DirectoryService from './src/api/Directory/services/DirectoryService'

const app = fastify()
const PORT = 8787

app.get(`/api/${env.API_VERSION}/directories`, async (req, res) => {
  const servicePath = `${__dirname}/src/api/response.xml`

  const service = await file(servicePath).text()

  res.headers({
    'Content-Type': 'application/xml',
  })

  let data =
    await DirectoryService.DirectoryService.DirectoryServicePortType.GetDirectories(
      {},
      (_, directores, __, ___, ____) => json2xml(directores)
    )

  data = service
    .replace('xmlns=""', `xmlns="http://localhost:${PORT}${req.url}"`)
    .replace('{}', data ?? '')

  res.send(data)
})

app.listen({ port: PORT })
