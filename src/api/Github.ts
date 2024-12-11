import { Octokit } from '@octokit/rest'
import { env } from '../../lib/environment'

export type GithubUser = {
  id: number
  login: string
}

export class GithubAPI {
  private readonly octokit = new Octokit({
    auth: env.GITHUB_ACCESS_TOKEN,
  })

  async getUsers(): Promise<GithubUser[]> {
    return (await this.octokit.request('GET /users')).data
      .slice(0, 3)
      .map(user => ({ id: user.id, login: user.login } satisfies GithubUser))
  }
}
