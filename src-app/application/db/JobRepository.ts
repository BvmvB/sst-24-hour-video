import {
	DynamoDBClient,
	PutItemCommand,
	PutItemCommandInput,
	GetItemCommand,
	GetItemCommandInput,
} from '@aws-sdk/client-dynamodb'
import { Table } from '@serverless-stack/node/table'
import { unmarshall, marshall } from '@aws-sdk/util-dynamodb'

import { IJobRepository, Job } from '../../domain/contracts'

export class JobRepository implements IJobRepository {
	private readonly client: DynamoDBClient

	private constructor() {
		this.client = new DynamoDBClient({})
	}

	public static create(): JobRepository {
		return new JobRepository()
	}

	public async persist(job: Job): Promise<void> {
		const params: PutItemCommandInput = {
			TableName: Table.jobs.tableName,
			Item: marshall(job),
		}

		await this.client.send(new PutItemCommand(params))
	}

	public async retrieveById(id: string): Promise<Job | null> {
		const params: GetItemCommandInput = {
			TableName: Table.jobs.tableName,
			Key: marshall({ id: id || '' }),
		}

		const results = await this.client.send(new GetItemCommand(params))

		if (!results.Item) return null

		return unmarshall(results.Item) as Job
	}
}
