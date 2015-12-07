var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    created: {type: Date, default: Date.now},
    createdBy: String/*,
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }]*/
});

mongoose.model('Event', EventSchema);
