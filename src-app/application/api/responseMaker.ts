import { APIGatewayProxyResult } from 'aws-lambda'

export function makeFailResponse<T>(statusCode: number, body: T): APIGatewayProxyResult {
	return {
		statusCode,
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' },
	}
}

export function makeSuccessResponse<T>(statusCode: number, body: T): APIGatewayProxyResult {
	return {
		statusCode,
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' },
	}
}
