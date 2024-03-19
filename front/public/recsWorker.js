self.onmessage = async (event) => {
  const { id } = event.data;
  const response = await fetch(
    `http://localhost:4000/products/product/recommendations/${id}`
  );
  const data = await response.json();
  console.log("🚀 ~ data:", data);
  self.postMessage(data.similaritiesRes);
};
