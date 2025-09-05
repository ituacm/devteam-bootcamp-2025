async function sendMail(email, title, content) {
  return (await fetch(process.env.MAILER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: email,
      from: 'noreply@my-todo.com',
      title,
      content,
      type: 'text'
    })
  })).ok;
}


export {
  sendMail,
};
