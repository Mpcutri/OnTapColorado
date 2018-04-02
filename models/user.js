const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({
	username: { type: String, unique: false, required: false },
	password: { type: String, unique: false, required: false },
	brewery: { type: String, unique: false, required: false },
	breweryURL: { type: String, unique: false, required: false },
	location: { type: String, unique: false, required: false },
	website: { type: String, unique: false, required: false },
	phone_number: { type: String, unique: false, required: false },
	beer: [],
	photos: []
	// local: {
	// 	email: { type: String, unique: true },
	// 	password: { type: String }
	// },
	// google: {
	// 	id: { type: String },
	// 	photos: []
	// },
	// firstName: { type: String },
	// lastName: { type: String }
})

const beerSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String, // lager, ipa, porter . . etc.
  },
  ABV: {
    type: Number,
  },
  IBU: {
    type: Number,
  },
  onTap: {
    type: Boolean,
  },
});

// Define schema methods
userSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.local.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function(next) {
	if (!this.local.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.local.password = this.hashPassword(this.local.password)
		next()
	}
	// this.password = this.hashPassword(this.password)
	// next()
})

// Create reference to User & export
const User = mongoose.model('User', userSchema)
module.exports = User
