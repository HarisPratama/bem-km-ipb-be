const { ObjectId } = require('mongodb');
const NewsModel = require("../models/news");
const NewsCommentModel = require('../models/newsComments');
const fs = require('fs');

class NewsController {
	static async getNews(req, res) {
		try {
			const news = await NewsModel.find().sort({ date: -1 }).skip(+req.query.skip).limit(6);
			res.status(200).json({ status: 200, ok: true, data: news });
		} catch (error) {
			res.status(500).json({ status: 500, message: 'Ooops! something error', error: JSON.stringify(error.message) });
		}
	}

	static async getFilterNews(req, res) {
		try {
			const news = await NewsModel.find({
				category: req.query.category,
				$text: { $search: req.query.title }
			})
				.sort({ date: -1 })
				.skip(+req.query.skip)
				.limit(6);
			res.status(200).json({ status: 200, ok: true, data: news });
		} catch (error) {
			console.log(error.message);
			res.status(500).json({ status: 500, message: 'Ooops! something error' });
		}
	}

	static async getDetailNews(req, res) {
		try {
			const news = await NewsModel.findOne({ _id: ObjectId(req.params.id) })
				.populate('comments');

			res.status(200).json({ status: 200, ok: true, data: news });
		} catch (error) {
			res.status(500).json({ status: 500, message: 'Ooops! something error' });
		}
	}

	static async postNews(req, res) {
		try {
			const body = req.body;

			const file = fs.readFileSync(req.file.path);

			const news = {
				title: body.title,
				desc: body.desc,
				category: body.category,
				date: new Date(),
				images: `data:image/png;base64,${ file.toString('base64') }`
			};

			const insertNews = new NewsModel(news);
			await insertNews.save();
			res.status(200).json({ status: 200, ok: true, message: 'Success add news' });
		} catch (error) {
			console.log(error, '<< error');
			res.status(500).json({ status: 500, message: 'Ooops! something error', error });
		}
	}

	static async postComment(req, res) {
		try {
			const body = req.body;
			const comment = {
				comment: body.comment,
				name: body.name,
				email: body.email,
				news: body._id,
				date: new Date()
			};
			const insertComment = new NewsCommentModel(comment);
			await insertComment.save();
			res.status(200).json({ status: 200, ok: true, message: 'Comment has send' });
		} catch (error) {
			res.status(500).json({ status: 500, message: 'Ooops! something error', error: error.message });
		}
	}

	static async updateImageNews(req, res) {
		try {
			const getNews = await NewsModel.findOne({ _id: ObjectId(String(req.body.id)) });

			if (getNews) {
				let news = {
					title: getNews.title,
					desc: getNews.news,
					category: getNews.category,
					date: getNews.date ?? new Date(),
				};

				let file;

				if (req.file && req.file.path) {
					file = fs.readFileSync(req.file.path);
				}

				if (file) {
					news['images'] = `data:image/png;base64,${ file.toString('base64') }`;
				}

				await NewsModel.updateOne(
					{ _id: ObjectId(req.params.id) },
					{ $set: news }
				);

				res.status(200).json({ status: 200, ok: true, message: 'Success update news', data: news });
			} else {
				res.status(400).json({ status: 400, ok: true, message: 'Data not found' });
			}

		} catch (error) {
			res.status(500).json({ status: 500, message: 'Ooops! something error', error: error.message });
		}
	}

	static async updateNews(req, res) {
		try {
			const body = req.body;

			const getNews = await NewsModel.findOne({ _id: ObjectId(req.params.id) });

			if (getNews) {
				const news = {
					title: body.title ?? getNews.title,
					desc: body.desc ?? getNews.news,
					category: body.category ?? getNews.category,
					date: getNews.date ?? new Date(),
					images: getNews.images
				};

				await NewsModel.updateOne(
					{ _id: ObjectId(req.params.id) },
					{ $set: news }
				);

				res.status(200).json({ status: 200, ok: true, message: 'Success update news', data: news });
			} else {
				res.status(400).json({ status: 400, ok: true, message: 'Data not found' });
			}

		} catch (error) {
			res.status(500).json({ status: 500, message: 'Ooops! something error', error: error.message });
		}
	}

	static async deleteNews(req, res) {
		try {
			await NewsModel.deleteOne({ _id: ObjectId(req.params.id) });
			res.status(200).json({ status: 200, ok: true, message: 'Success delete news' });
		} catch (error) {
			res.status(500).json({ status: 500, message: 'Ooops! something error', error: error.message });
		}
	}
}

module.exports = NewsController;
