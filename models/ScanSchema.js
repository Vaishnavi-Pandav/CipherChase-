import mongoose from "mongoose";

const ScanSchema = new mongoose.Schema(
  {
    teamId: { type: String, required: true, trim: true },
    qrId: { type: String, required: true, trim: true },
    qrValue: { type: String, required: true, trim: true },
    scannedAt: { type: Date, default: Date.now },
    timeOnly: {
      type: String,
      default: () => {
        const now = new Date();
        return now.toTimeString().split(" ")[0];
      },
    },
  },
  { collection: "Qr-Treasure-Hunt" }
);

const Scan = mongoose.models.Scan || mongoose.model("Scan", ScanSchema);