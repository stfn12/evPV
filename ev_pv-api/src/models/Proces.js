import mongoose from "mongoose";

const schema = new mongoose.Schema({
  serie: { type: String, required: true, uppercase: true, createIndex: true },
  numar: { type: String, required: true },
  data_proces: { type: Date },
  marca: { type: String, required: true, createIndex: true },
  contravenient: { type: String, required: true, createIndex: true },
  adresa: { type: String },
  suma: { type: String },
  mod_intocmire: { type: String },
  platit: { type: String },
  numar_chitanta: { type: String },
  data_chitanta: { type: Date },
  suma_chitanta: { type: String },
  ascuns: { type: Number }
}, { timestamps: true });

export default mongoose.model("Pv", schema);
