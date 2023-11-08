import { Schema, model, models } from "mongoose";

const TicketSchema = new Schema({
  pair: { type: String, required: [true, "asset pair is required"] },
  open: { type: Number, required: [true, "ticket must have an opening price"] },
  close: { type: Number, required: false },
  pnl: { type: String, required: false },
});

const KeySchema = new Schema({
  name: { type: String, required: [true, "Key must have a name"] },
  address: { type: String, required: [true, "Key must have an address"] },
  owner: { type: String, required: [true, "Key must have an owner"] },
  ticket: [TicketSchema],
  price: { type: Number, required: false },
  value: { type: Number, required: false },
});

export const Key = models.Key || model("Key", KeySchema);
