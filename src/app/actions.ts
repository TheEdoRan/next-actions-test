"use server";

import { ac } from "@/lib/safe-action";
import { flattenValidationErrors } from "next-safe-action";
import { z } from "zod";

const schema = z.object({
	username: z.string().min(3).max(10),
	password: z.string().min(8).max(100),
});

export const loginUser = ac
	.metadata({ actionName: "loginUser" })
	.schema(schema, { formatValidationErrors: flattenValidationErrors })
	.action(async (obj) => {
		return {
			message: `Hey ${obj.parsedInput.username}, successfully logged in!`,
		};
	});
