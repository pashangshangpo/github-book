import Github from 'octonode'
import { GetData } from '$common/local-storage'

const { token, projectPath } = GetData('github')

export const ProjectPath = projectPath
export const Client = Github.client(token)
export const Repo = Client.repo(ProjectPath)
