var mongoose = require('mongoose');

var AssignmentSchema = new mongoose.Schema({
    kapitel: Number,
    assignedTo: String,
    assigned: {type: Date, default: Date.now},
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    uniqueKey: {type: String, unique: true}
});

mongoose.model('Assignment', AssignmentSchema);