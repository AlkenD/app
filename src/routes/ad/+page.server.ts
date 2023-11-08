import pb from '$lib/pb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const votes = await pb.collection('votes').getFullList();
	return {
		votes: votes
	};
};
