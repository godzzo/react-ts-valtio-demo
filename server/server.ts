import express from 'express';
import { promises as fs } from 'node:fs';

const app = express();

app.get('/api/hello', async (req, res) => {
	setTimeout(() => {
		res.json({ message: 'Hello World! XX' });
	}, 1000);
});

app.get('/api/reviews', async (req, res) => {
	const reviews = await readReviews();

	return res.json(reviews);
});

app.get('/api/reviewFilter', async (req, res) => {
	const reviews = await readReviews();

	const type = (req.query.type ?? null) as string | null;
	const title = (req.query.title ?? null) as string | null;

	const pageSize = parseInt((req.query.size ?? '10') as string);
	const page = parseInt((req.query.page ?? '1') as string);
	const scoreLimit = parseInt((req.query.scoreLimit ?? '-1') as string);
	const scoreLower = parseInt((req.query.scoreLower ?? '-1') as string);
	const sleep = parseInt((req.query.sleep ?? '-1') as string);

	if (sleep > 0) {
		await new Promise((resolve) => setTimeout(resolve, sleep));
	}

	const items = reviews.filter(
		(review) =>
			(type === null || review.type.includes(type)) &&
			(title === null ||
				review.title.toLowerCase().includes(title.toLowerCase())) &&
			(scoreLimit === -1 || review.score >= scoreLimit) &&
			(scoreLower === -1 || review.score <= scoreLower)
	);

	const count = items.length;
	const pages = Math.floor(count / pageSize) + (count % pageSize > 0 ? 1 : 0);

	return res.json({
		data: items.slice(pageSize * (page - 1), pageSize * page),
		count,
		pages,
	});
});

app.get('/api/reviewStat', async (req, res) => {
	const reviews = await readReviews();

	const stat = reviews.reduce((acc, review) => {
		const type = review.type.replace('icon-', '').replace('-object', '');

		return { ...acc, [type]: acc[type] ? acc[type] + 1 : 1 };
	}, {} as Record<string, number>);

	return res.json(stat);
});

app.listen(5008);

async function readReviews() {
	return await readJson<ReviewItem>('ign-reviews');
}

async function readJson<T>(path: string) {
	const text = await fs.readFile(`./server/data/${path}.json`, 'utf-8');
	return JSON.parse(text) as T[];
}

type ReviewItem = {
	id: number;
	score: number;
	url: string;
	image: string;
	type: string;
	title: string;
};
