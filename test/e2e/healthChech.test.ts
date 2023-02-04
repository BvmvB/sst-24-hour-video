import axios from "axios";
import { describe, it, expect } from "vitest";
import { Api } from "@serverless-stack/node/api";

const API_URL = Api.api.url;

describe("API GET /", () => {
	it("should respond with 200 OK", async () => {
		const data = await axios.get(`${API_URL}`);

		expect(data.status).toBe(200);
	});
});
