const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    title: {
        type: String,
        minlength: 2,
        maxlength: 100,
    },
    description: {
        type: String,
    },
    parentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    photo: {
        type: String,
        default: 'path/to/default/photo.png',
    },
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