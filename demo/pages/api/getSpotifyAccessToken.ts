import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth, clerkClient, OauthAccessToken } from "@clerk/nextjs/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const client = await clerkClient();

  if (req.method === "GET") {
    try {
      const clerkResponse = await client.users.getUserOauthAccessToken(
        userId,
        "oauth_spotify"
      );
      const oauthAccessTokens: OauthAccessToken[] = clerkResponse.data;
      const accessToken = oauthAccessTokens[0].token || "";

      return res.status(200).json({ accessToken: accessToken });
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized: NO TOKEN" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
