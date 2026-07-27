import { connectToDB } from "@/utils/db";
import Team from "@/models/SecondaryTeam";

export async function GET() {
  try {
    await connectToDB();

    const teams = await Team.find({});

    const leaderboard = teams.map((team) => {
      const scannedCodes = team.codes.filter((code) => code.scanned);

      const latestScanTime = scannedCodes.length
        ? Math.max(...scannedCodes.map((c) => new Date(c.scannedAt).getTime()))
        : null;

      return {
        name: team.name,
        score: scannedCodes.length,
        latestScanTime,
      };
    });

    // Sort:
    // 1. By score (desc)
    // 2. By latestScanTime (asc) — earlier finish ranks higher
    leaderboard.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.latestScanTime && b.latestScanTime) {
        return a.latestScanTime - b.latestScanTime;
      }
      return 0;
    });

    return Response.json({ success: true, leaderboard }, { status: 200 });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}