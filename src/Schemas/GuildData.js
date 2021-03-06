const { Schema, model } = require('mongoose');
const { prefix } = require('../Structures/Configuration.js');

module.exports = model('Guild', new Schema({
	id: { type: String },
	membersData: { type: Object, default: {} },
	members: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
	prefix: { type: String, default: prefix },
	plugins: { type: Object, default: {
		welcome: {
			enabled: false,
			message: null,
			channel: null,
			withImage: null
		},
		goodbye: {
			enabled: false,
			message: null,
			channel: null,
			withImage: null
		},
		autorole: {
			enabled: false,
			role: null
		},
		automod: {
			enabled: false,
			ignored: []
		},
		warnsSanctions: {
			kick: false,
			ban: false
		},
		suggestions: false,
		moderations: false,
		audits: false,
		reports: false,
		logs: false
	} },
	casesCount: { type: Number, default: 0 },
	ignoredChannels: { type: Array, default: [] },
	autoDeleteModCommands: { type: Boolean, default: false }
}));
