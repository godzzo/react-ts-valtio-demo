// BookListItem__title
// authors: BookListItem__authors >  ContributorLink__name
// image: BookCover__image / img
// description: TruncatedContent
// GiveawayGenres__tag ... multiple

function grabBooks() {
	const books = Array.from(document.querySelectorAll('.BookListItem'));

	const recs = books.map((b) => {
		const title = b.querySelector('.BookListItem__title').innerText;
		const authors = Array.from(
			b.querySelectorAll('.ContributorLink__name')
		).map((a) => a.innerText);
		const image = b.querySelector('.BookCover__image > img').src;
		const text = b.querySelector('.TruncatedContent').innerText;
		const description = b.querySelector('.TruncatedContent').innerHTML;
		const genres = Array.from(
			b.querySelectorAll('.GiveawayGenres__tag')
		).map((g) => g.innerText);

		return { title, authors, image, text, description, genres };
	});

	return recs;
}

grabBooks();
