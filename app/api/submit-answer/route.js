import TeamData from "@/models/SecondaryTeam";
import { connectToDB } from "@/utils/db";

export async function POST(req) {
  try {
    await connectToDB();
    const { teamId, qrId, qrValue, answer } = await req.json();

    if (!teamId || !qrId || !qrValue || !answer) {
      return Response.json(
        { success: false, message: "⚠️ Missing required fields" },
        { status: 400 }
      );
    }

    const teamDoc = await TeamData.findOne({ teamId, qrId });
    if (!teamDoc) {
      return Response.json(
        { success: false, message: "🚫 Invalid team or QR ID" },
        { status: 404 }
      );
    }

    const currentIndex = teamDoc.codes.findIndex(
      (code) => code.value === qrValue
    );
    if (currentIndex === -1) {
      return Response.json(
        { success: false, message: "❓ QR value not found" },
        { status: 400 }
      );
    }

    const code = teamDoc.codes[currentIndex];
    if (code.scanned) {
      return Response.json(
        { success: false, message: "🔁 Already completed this QR" },
        { status: 200 }
      );
    }

    // Check answer
    if (code.answer?.toLowerCase().trim() === answer.toLowerCase().trim()) {
      const now = new Date();

      teamDoc.codes[currentIndex].scanned = true;
      teamDoc.codes[currentIndex].scannedAt = now;
      teamDoc.codes[currentIndex].timeOnly = now.toTimeString().split(" ")[0];

      await teamDoc.save();

      return Response.json(
        {
          success: true,
          message: "🎉 Correct! Here's your hint.",
          hint: code.hint,
        },
        { status: 200 }
      );
    } else {
      const PENALTY_MINUTES = 2;
      const penaltyEnd = new Date(Date.now() + PENALTY_MINUTES * 60 * 1000);

      teamDoc.penaltyUntil = penaltyEnd;
      await teamDoc.save();

      return Response.json(
        {
          success: false,
          message: `❌ Incorrect answer! Penalty applied ${PENALTY_MINUTES} minutes.`,
          penaltyUntil: penaltyEnd,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error submitting answer:", error);
    return Response.json(
      { success: false, message: "💥 Internal server error" },
      { status: 500 }
    );
  }
}
