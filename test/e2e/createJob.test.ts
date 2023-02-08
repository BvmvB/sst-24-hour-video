import axios, { AxiosResponse } from 'axios'
import { describe, expect, it } from 'vitest'
import { Api } from '@serverless-stack/node/api'

const API_URL = Api.api.url

describe('createJob: API POST /jobs', () => {
	describe('getJob: API GET /jobs/{id}', () => {
		describe('given valid input', () => {
			it('should create and retrieve a Job', async () => {
				const createResponse = await axios.post(`${API_URL}/jobs`)
				assertJobCreated(createResponse)

				const getResponse = await axios.get(`${API_URL}/jobs/${createResponse.data.id}`)
				assertJobRetrieved(getResponse)
			})
		})

		describe('given an non-existent Job ID', () => {
			it('should return a 404', async () => {
				const response = await axios.get(`${API_URL}/jobs/123`, { validateStatus: () => true })
				expect(response.status).toBe(404)
			})
		})
	})
})

function assertJobCreated(response: AxiosResponse) {
	expect(response.status).toBe(201)
	expect(response.headers['content-type']).toBe('application/json')
	expect(response.data).toMatchObject({
		id: expect.any(String),
		status: 'CREATED',
		uploadUrl: expect.any(String),
	})
}

function assertJobRetrieved(response: AxiosResponse) {
	expect(response.status).toBe(200)
	expect(response.headers['content-type']).toBe('application/json')
	expect(response.data).toMatchObject({
		id: expect.any(String),
		status: 'CREATED',
	})
}
