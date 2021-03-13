import mongoose from 'mongoose';

const issueSchema = mongoose.Schema({
    username: {
        type: String,
        default: ''
    },
    description: String,
});

const Issue = mongoose.model('Issues', issueSchema);

export default Issue;