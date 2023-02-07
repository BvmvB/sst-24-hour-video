export enum JobStatus {
	CREATED = 'CREATED',
	COMPLETED = 'COMPLETED',
	PROCESSING = 'PROCESSING',
}

export interface Job {
	id: string
	status: JobStatus
}

export interface IJobRepository {
	persist(job: Job): Promise<void>
	retrieveById(id: string): Promise<Job | null>
}
