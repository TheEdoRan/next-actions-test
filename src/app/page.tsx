"use client";

import { loginUser } from "./actions";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-between p-24">
			<h1 className="text-4xl">Action test</h1>
			<form
				className="flex flex-col space-y-4"
				onSubmit={async (e) => {
					e.preventDefault();

					const target = e.target as unknown as {
						username: { value: string };
						password: { value: string };
					};

					const res = await loginUser({
						username: target.username.value,
						password: target.password.value,
					});

					console.log(res);
				}}>
				<input
					className="border py-1 px-2 rounded"
					type="text"
					name="username"
					placeholder="Username"
				/>
				<input
					className="border py-1 px-2 rounded"
					type="text"
					name="password"
					placeholder="Password"
				/>
				<button className="rounded bg-black text-white px-3 py-2">
					Submit
				</button>
			</form>
		</main>
	);
}
