import { Bucket, Stack } from '@serverless-stack/resources'

export class ProcessedFilesBucket {
	public static resource: Bucket

	private constructor() {}

	public static provision(stack: Stack): Bucket {
		if (!ProcessedFilesBucket.resource) {
			ProcessedFilesBucket.resource = new Bucket(stack, 'ProcessedFilesBucket', {
				name: '24h-video-processed-files-bucket',
			})
		}

		return ProcessedFilesBucket.resource
	}
}
