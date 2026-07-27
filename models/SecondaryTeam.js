import mongoose from "mongoose";

const CodeSchema = new mongoose.Schema({
  value: { type: String, required: true },
  scanned: { type: Boolean, default: false },
  scannedAt: { type: Date, default: null }, // Full ISO timestamp
  timeOnly: { type: String, default: null }, // Just the "HH:mm:ss" string
  question: { type: String },
  options: { type: [String] },
  answer: { type: String },
  hint: { type: String },
});

const TeamSchema = new mongoose.Schema(
  {
    teamId: { type: String, required: true, unique: true },
    qrId: { type: String, required: true },
    name: { type: String },
    penaltyUntil: { type: Date, default: null },
    codes: [CodeSchema],
  },
  { collection: "Team-Codes" }
);

// delete mongoose.connection.models["TeamData"];
const TeamData =
  mongoose.models.TeamData || mongoose.model("TeamData", TeamSchema);

export default TeamData;