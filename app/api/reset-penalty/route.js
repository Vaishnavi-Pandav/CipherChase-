import TeamData from "@/models/SecondaryTeam";
import { connectToDB } from "@/utils/db";

export async function POST(req) {
  try {
    await connectToDB();
    const { teamId } = await req.json();

    if (teamId === "ALL") {
      // Reset all teams
      const result = await TeamData.updateMany({}, { $set: { penaltyUntil: null } });
      return Response.json({ success: true, message: `Penalty cleared for all ${result.modifiedCount} teams` }, { status: 200 });
    }

    if (!teamId) {
      return Response.json({ success: false, message: "Missing teamId" }, { status: 400 });
    }

    const result = await TeamData.updateOne(
      { teamId },
      { $set: { penaltyUntil: null } }
    );

    if (result.matchedCount === 0) {
      return Response.json({ success: false, message: "Team not found" }, { status: 404 });
    }

    return Response.json({ success: true, message: `Penalty cleared for ${teamId}` }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
