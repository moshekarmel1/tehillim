var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    postBody: String,
    upvotes: {type: Number, default: 0},
    upvoters: [{type: String}],
    author: String,
    posted: {type: Date, default: Date.now},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

PostSchema.methods.upvote = function(username, cb) {
	if(this.upvoters.indexOf(username) === -1 && this.author !== username){
    	this.upvotes += 1;
    	this.upvoters.push(username);
    	this.save(cb);
	}else{
		cb(null, "ERROR");
	}
    
};

mongoose.model('Post', PostSchema);
