import { connectToDB } from "@/utils/db";
import Team from "@/models/SecondaryTeam";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const teamId = searchParams.get("teamId");

  if (!teamId) {
    return Response.json(
      { success: false, message: "Team ID required" },
      { status: 400 }
    );
  }

  try {
    await connectToDB();
    const teamDoc = await Team.findOne({ teamId });

    if (!teamDoc) {
      return Response.json(
        { success: false, message: "Team not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, codes: teamDoc.codes },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching team progress:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}