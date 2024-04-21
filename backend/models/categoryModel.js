const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    parentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    photo: String,
    slug: {
        type: String,
        unique: true,
    },
});

categorySchema.pre('save', function (next) {
    if (!this.slug) {

        this.slug = slugify(this.title);
    }
    next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;