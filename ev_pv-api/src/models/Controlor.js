import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema({
  marca: {type: String, required: true, createIndex: true, unique: true },
  nume: { type:String, required: true, createIndex: true }
}, {timestamps: true});

schema.plugin(uniqueValidator, {message: 'Marca existenta'});

export default mongoose.model('Controlor', schema);
