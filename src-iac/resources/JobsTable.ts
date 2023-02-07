import { Stack, Table } from '@serverless-stack/resources'

export class JobsTable {
	private static resource: Table

	private constructor() {}

	public static provision(stack: Stack): Table {
		if (!JobsTable.resource) {
			const table = new Table(stack, 'jobs', {
				fields: {
					id: 'string',
					status: 'string',
				},
				primaryIndex: { partitionKey: 'id' },
			})

			JobsTable.resource = table
		}

		return JobsTable.resource
	}
}
