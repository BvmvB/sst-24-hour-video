import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { JobRepository } from '../../db/JobRepository'
import { makeFailResponse, makeSuccessResponse } from '../responseMaker'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const job = await JobRepository.create().retrieveById(event.pathParameters!.id!)

	if (!job) {
		return makeFailResponse(404, {})
	}

	return makeSuccessResponse(200, job)
}
