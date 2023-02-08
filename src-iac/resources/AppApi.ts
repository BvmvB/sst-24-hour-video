import { Api, Stack } from '@serverless-stack/resources'

import { JobsTable } from './JobsTable'
import { RawFilesBucket } from './RawFilesBucket'

export class AppApi {
	private static resource: Api
	private static readonly ControllersPath = 'application/api/controllers'

	private constructor() {}

	public static provision(stack: Stack): Api {
		if (!AppApi.resource) {
			const jobsTable = JobsTable.provision(stack)
			const rawFileBucket = RawFilesBucket.provision(stack)

			const api = new Api(stack, 'api', {
				defaults: {
					function: {
						bind: [jobsTable, rawFileBucket],
					},
				},
				routes: {
					'GET  /': AppApi.fullPath('healthCheck'),
					'POST /jobs': AppApi.fullPath('createJob'),
					'GET  /jobs/{id}': AppApi.fullPath('getJob'),
				},
			})

			AppApi.resource = api
		}

		return AppApi.resource
	}

	private static fullPath(controller: string) {
		return `${AppApi.ControllersPath}/${controller}.handler`
	}
}
