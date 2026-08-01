import TeamData from "@/models/SecondaryTeam";
import { connectToDB } from "@/utils/db";

export async function POST(req) {
  try {
    await connectToDB();
    const { teamId, penaltyUntil } = await req.json();

    if (!teamId || !penaltyUntil) {
      return Response.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    // Only apply if new penalty is worse than existing one
    const teamDoc = await TeamData.findOne({ teamId });
    if (!teamDoc) {
      return Response.json({ success: false, message: "Team not found" }, { status: 404 });
    }

    const newPenalty = new Date(penaltyUntil);
    const existingPenalty = teamDoc.penaltyUntil ? new Date(teamDoc.penaltyUntil) : null;

    if (!existingPenalty || newPenalty > existingPenalty) {
      teamDoc.penaltyUntil = newPenalty;
      await teamDoc.save();
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Tab penalty error:", error);
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
