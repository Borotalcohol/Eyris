import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import clerk from "@clerk/clerk-sdk-node";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const [OauthAccessToken] = await clerk.users.getUserOauthAccessToken(
        userId || "",
        "oauth_spotify"
      );

      return res.status(200).json({ accessToken: OauthAccessToken.token });
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized: NO TOKEN" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
