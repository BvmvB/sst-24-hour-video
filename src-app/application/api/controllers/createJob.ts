import * as aws from 'aws-sdk'
import { createId } from '@paralleldrive/cuid2'
import { Bucket } from '@serverless-stack/node/bucket'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { JobStatus } from '../../../domain/contracts'
import { JobRepository } from '../../db/JobRepository'
import { makeSuccessResponse } from '../responseMaker'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const job = { id: createId(), status: JobStatus.CREATED }

	await JobRepository.create().persist(job)

	return makeSuccessResponse(201, {
		...job,
		uploadUrl: makeFileUploadUrl(job.id),
	})
}

function makeFileUploadUrl(id: string): string {
	const s3 = new aws.S3({})

	return s3.getSignedUrl('putObject', {
		Key: id,
		Expires: 60 * 10, // 10 minutes
		Bucket: Bucket.RawFilesBucket.bucketName,
	})
}
