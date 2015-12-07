var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    body: String,
    author: String,
    upvotes: {type: Number, default: 0},
    posted: {type: Date, default: Date.now},
    upvoters: [{type: String}],
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

CommentSchema.methods.upvote = function(username, cb) {
	if(this.upvoters.indexOf(username) === -1 && this.author !== username){
	    this.upvotes += 1;
	    this.upvoters.push(username);
	    this.save(cb);
	}else{
		cb(null, 'ERROR');
	}
};

mongoose.model('Comment', CommentSchema);
