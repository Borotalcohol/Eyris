"use server";

import { z } from "zod";

export async function sendContactEmail(formData: FormData, token: string) {
  // 1. Validate ReCaptcha token
  if (!token) return { success: false, message: "Invalid ReCaptcha token" };

  const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_PRIVATE_KEY}&response=${token}`;
  const recaptchaRes = await fetch(recaptchaUrl, { method: "POST" });
  const recaptchaData = await recaptchaRes.json();
  if (!recaptchaData.success)
    return { success: false, message: "Invalid ReCaptcha token" };

  // 2. Validate against schema with zod
  const schema = z.object({
    full_name: z.string().min(3).max(50),
    email_address: z.string().min(3).max(50).email(),
    title: z.string().min(3).max(256),
    message: z.string().min(3).max(512),
  });
  const validationRes = schema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validationRes.success)
    return {
      success: false,
      message: "Invalid form data, please check the fields and try again.",
    };

  // 3. Send email
  const url = `${process.env.MAILGUN_API_URL}/${process.env.MAILGUN_DOMAIN}/messages`;
  const form = new FormData();
  form.append("template", process.env.MAILGUN_CONTACT_TEMPLATE_NAME!);
  form.append("from", process.env.MAILGUN_FROM_EMAIL!);
  form.append("to", process.env.MAILGUN_TO_EMAIL!);
  form.append("subject", "New Contact Request");
  form.append(
    "h:X-Mailgun-Variables",
    JSON.stringify(Object.fromEntries(formData.entries()))
  );

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `api:${process.env.MAILGUN_API_KEY}`
      ).toString("base64")}`,
    },
    body: form,
  });

  // 4. Return response
  if (res.status === 200)
    return { success: true, message: "Email sent successfully!" };
  else console.log(await res.text());

  return {
    success: false,
    message:
      "There was an error in processing the request, please try again later.",
  };
}
