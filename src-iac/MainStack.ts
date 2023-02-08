import { StackContext } from '@serverless-stack/resources'

import { AppApi } from './resources/AppApi'
import { JobsTable } from './resources/JobsTable'
import { RawFilesBucket } from './resources/RawFilesBucket'

export function MyStack({ stack }: StackContext) {
	JobsTable.provision(stack)
	RawFilesBucket.provision(stack)

	const api = AppApi.provision(stack)

	stack.addOutputs({
		ApiEndpoint: api.url,
	})
}
