import TeamData from "@/models/SecondaryTeam";
import { connectToDB } from "@/utils/db";

const PENALTY_MINUTES = 2;

export async function POST(req) {
  try {
    await connectToDB();
    const { teamId, qrId, qrValue } = await req.json();

    if (!teamId || !qrId || !qrValue) {
      return Response.json(
        { success: false, message: "⚠️ Missing teamId, qrId, or qrValue" },
        { status: 400 }
      );
    }

    // Single query by teamId only (covers penalty check + wrong QR check)
    const anyTeamDoc = await TeamData.findOne({ teamId });

    // If penalty active → block immediately
    if (anyTeamDoc?.penaltyUntil && new Date() < new Date(anyTeamDoc.penaltyUntil)) {
      return Response.json(
        {
          success: false,
          message: `⏳ Penalty active! Wait.`,
          penaltyUntil: new Date(anyTeamDoc.penaltyUntil).toISOString(),
        },
        { status: 403 }
      );
    }

    // Find the specific team+QR combo
    const teamDoc = await TeamData.findOne({ teamId, qrId });

    // Case 1: QR not assigned to this team → penalty
    if (!teamDoc) {
      const penaltyUntil = new Date(Date.now() + PENALTY_MINUTES * 60 * 1000);
      if (anyTeamDoc) {
        anyTeamDoc.penaltyUntil = penaltyUntil;
        await anyTeamDoc.save();
      }
      return Response.json(
        {
          success: false,
          message: `🚫 Wrong team's QR! Penalty ${PENALTY_MINUTES} minutes.`,
          penaltyUntil: penaltyUntil.toISOString(),
        },
        { status: 400 }
      );
    }

    const currentIndex = teamDoc.codes.findIndex((code) => code.value === qrValue);
    if (currentIndex === -1) {
      return Response.json(
        { success: false, message: "❓ QR value not found for this team" },
        { status: 400 }
      );
    }

    // Case 2: Sequence wrong → penalty
    if (currentIndex > 0 && !teamDoc.codes[currentIndex - 1].scanned) {
      const penaltyUntil = new Date(Date.now() + PENALTY_MINUTES * 60 * 1000);
      teamDoc.penaltyUntil = penaltyUntil;
      await teamDoc.save();
      return Response.json(
        {
          success: false,
          message: `⏭️ Wrong order! Penalty ${PENALTY_MINUTES} minutes.`,
          penaltyUntil: penaltyUntil.toISOString(),
        },
        { status: 400 }
      );
    }

    const code = teamDoc.codes[currentIndex];

    // Already scanned → show hint again
    if (code.scanned) {
      return Response.json(
        { success: true, message: "🔍 Already completed. Here's your hint.", hint: code.hint },
        { status: 200 }
      );
    }

    // No question assigned
    if (!code.question) {
      return Response.json(
        { success: false, message: "❌ No question assigned to this QR" },
        { status: 404 }
      );
    }

    // ✅ Valid QR
    return Response.json(
      {
        success: true,
        message: "✅ QR validated! Answer the question.",
        question: { text: code.question, options: code.options },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error validating QR:", error);
    return Response.json(
      { success: false, message: "💥 Internal server error" },
      { status: 500 }
    );
  }
}
