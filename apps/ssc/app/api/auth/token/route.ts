import { getServerSession } from "next-auth";
import { authOptions } from "~/lib/auth-options";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    !session.user ||
    session.error === "RefreshAccessTokenError"
  ) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Return user info without sensitive tokens
  return new Response(
    JSON.stringify({
      user: {
        id: session.user.id,
        email: session.user.email,
        firstName: session.user.firstName,
        lastName: session.user.lastName,
        image: session.user.image,
        skyUsername: session.user.skyUsername,
        skyPassword: session.user.skyPassword,
      },
    }),
    {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json",
      },
    }
  );
}
