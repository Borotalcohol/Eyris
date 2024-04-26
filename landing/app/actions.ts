"use server";

export async function sendContactEmail(formData: FormData, token: string) {
  // 1. Validate against schema
  // 2. Send email
  // 3. Return response
  console.log("Token: ", token);
  console.log("FormData: ", formData);
  return { success: true, message: "Email sent successfully!" };
}
