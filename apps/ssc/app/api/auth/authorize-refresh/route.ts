import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "~/core/api/server/serverApi";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  try {
    // Get the current session
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Get the refresh token from the session
    const refreshToken = token.refreshToken;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, error: "No refresh token available" },
        { status: 400 }
      );
    }

    const response = await serverApi.auth.authorizeWithToken(refreshToken);

    if (response.status === 200 && response.data?.success) {
      const handshakeToken = response.data.data.handshake_token;

      return NextResponse.json({
        success: true,
        handshakeToken: handshakeToken,
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Failed to get handshake token" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in authorize-refresh:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
