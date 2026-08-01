import TeamData from "@/models/SecondaryTeam";
import { connectToDB } from "@/utils/db";

export async function POST(req) {
  try {
    await connectToDB();
    const { teamId, reason } = await req.json();

    if (!teamId) {
      return Response.json({ success: false, message: "Missing teamId" }, { status: 400 });
    }

    const teamDoc = await TeamData.findOne({ teamId });
    if (!teamDoc) {
      return Response.json({ success: false, message: "Team not found" }, { status: 404 });
    }

    teamDoc.disqualified = true;
    teamDoc.disqualifyReason = reason || "Rule violation";
    await teamDoc.save();

    return Response.json({ success: true, message: `Team ${teamId} disqualified.` }, { status: 200 });
  } catch (error) {
    console.error("Disqualify error:", error);
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
