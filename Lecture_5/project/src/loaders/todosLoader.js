export const todosLoader = async () => {
  const response = await fetch(
    "https://66b9a5b1fa763ff550f8f787.mockapi.io/ituacm-website-ekibi/todos"
  );
  const data = await response.json();
  return data;
};