export const todosLoader = async () => {
  const res = await fetch(
    "https://66b9a5b1fa763ff550f8f787.mockapi.io/ituacm-website-ekibi/todos"
  );
  const data = await res.json();
  return data;
};