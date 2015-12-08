var mongoose = require('mongoose');

var AssignmentSchema = new mongoose.Schema({
    kapitel: Number,
    assignedTo: String,
    assigned: {type: Date, default: Date.now},
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('Assignment', AssignmentSchema);