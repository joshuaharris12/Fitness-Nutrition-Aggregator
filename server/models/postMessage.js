import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    message: {type:String, required: true},
    userFrom: {type: String, required: true},
    name: {type: String, required: true},
    creator: {type: String, required: true},
    tags: [{type: String, required: false}],
    selectedFile: {type: String, required: false},
    url: {type: String, required: false},
    audioFile: {type: String, required: false},
    embeddedLink: {type: String, required: false},
    facebookLink: {type: String, required: false},
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});



const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;