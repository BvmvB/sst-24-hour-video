import { Bucket, Stack } from '@serverless-stack/resources'

export class RawFilesBucket {
	public static resource: Bucket

	private constructor() {}

	public static provision(stack: Stack): Bucket {
		if (!RawFilesBucket.resource) {
			RawFilesBucket.resource = new Bucket(stack, 'RawFilesBucket', {
				name: '24h-video-raw-files-bucket',
			})
		}

		return RawFilesBucket.resource
	}
}
