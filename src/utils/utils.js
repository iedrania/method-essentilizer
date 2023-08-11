export function downloadJson(filename, title, creator, description, tasks, roles) {
  const data = {
    title,
    creator,
    description,
    tasks,
    roles,
  };

  const jsonString = JSON.stringify(data, null, 2);
  const file = new Blob([jsonString], { type: 'application/json' });
  const fileUrl = URL.createObjectURL(file);

  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = `${filename}.json`;
  link.click();
}
