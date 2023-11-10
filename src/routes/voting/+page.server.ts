import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import pb from '$lib/pb';

export const load: PageServerLoad = async ({ params }) => {
	const presidentCandidates = await pb.collection('candidates').getFullList({
		filter: 'position = "president"'
	});

	const vicePresidentCandidates = await pb.collection('candidates').getFullList({
		filter: 'position = "vice-president"'
	});

	const generalSecretaryCandidates = await pb.collection('candidates').getFullList({
		filter: 'position = "general-secretary"'
	});

	const culturalSecretaryCandidates = await pb.collection('candidates').getFullList({
		filter: 'position = "cultural-secretary"'
	});

	const assistantCulturalSecretaryCandidates = await pb.collection('candidates').getFullList({
		filter: 'position = "assistant-cultural-secretary"'
	});

	const sportsSecretaryCandidates = await pb.collection('candidates').getFullList({
		filter: 'position = "sports-secretary"'
	});

	const assistantSportsSecretaryCandidates = await pb.collection('candidates').getFullList({
		filter: 'position = "assistant-sports-secretary"'
	});
	return {
		presidentCandidates: presidentCandidates,
		vicePresidentCandidates: vicePresidentCandidates,
		generalSecretaryCandidates: generalSecretaryCandidates,
		culturalSecretaryCandidates: culturalSecretaryCandidates,
		assistantCulturalSecretaryCandidates: assistantCulturalSecretaryCandidates,
		sportsSecretaryCandidates: sportsSecretaryCandidates,
		assistantSportsSecretaryCandidates: assistantSportsSecretaryCandidates
	};
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const studentId = formData.get('student_id') as string;
		const studentInfo = await pb.collection('students').getOne(studentId);
		const alreadyVoted = studentInfo.voted;
		if (alreadyVoted) {
			throw redirect(302, '/alreadydone');
		} else {
			try {
				formData.forEach(async (value, key) => {
					if (key !== 'student_id') {
						await pb.collection('votes').create({
							candidate: value,
							position: key
						});
					}
				});
				await pb.collection('voted').create({
					uucms_id: studentInfo.uucms_id,
					voted: true
				});
			} catch (err) {
				console.log(err);
			}
			throw redirect(302, '/success');
		}
	}
};
