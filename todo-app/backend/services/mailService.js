const KOLPOMAIL_HOST = process.env.KOLPOMAIL_HOST;

export async function sendMail(to, title, content) {
  await fetch(KOLPOMAIL_HOST + "/api/internal/mail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to,
      from: "no-reply@my-todo-application.com",
      content,
      type: "html",
      title,
    }),
  });
}
