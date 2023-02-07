import { Api, Stack } from '@serverless-stack/resources'
import { JobsTable } from './JobsTable'

const CONTROLLERS_PATH = 'application/api/controllers'

export class AppApi {
	private static resource: Api

	private constructor() {}

	public static provision(stack: Stack): Api {
		if (!AppApi.resource) {
			const jobsTable = JobsTable.provision(stack)

			const api = new Api(stack, 'api', {
				defaults: {
					function: {
						bind: [jobsTable],
					},
				},
				routes: {
					'GET /': `${CONTROLLERS_PATH}/healthCheck.handler`,
					'POST /jobs': `${CONTROLLERS_PATH}/createJob.handler`,
					'GET /jobs/{id}': `${CONTROLLERS_PATH}/getJob.handler`,
				},
			})

			AppApi.resource = api
		}

		return AppApi.resource
	}
}
