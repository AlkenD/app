import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { email, password } = await request.json();

	const { token, record } = await locals.pb.collection('users').authWithPassword(email, password);

	console.log(record);

	return new Response('Success...');
};
