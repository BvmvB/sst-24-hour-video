import { createId } from '@paralleldrive/cuid2'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { JobStatus } from '../../../domain/contracts'
import { JobRepository } from '../../db/JobRepository'
import { makeSuccessResponse } from '../responseMaker'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const job = { id: createId(), status: JobStatus.CREATED }

	await JobRepository.create().persist(job)

	return makeSuccessResponse(201, job)
}
