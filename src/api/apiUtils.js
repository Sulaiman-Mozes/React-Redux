export const handleResponse = async (response) => {
  if (response.ok) return response.json();
  if (response.status === 400) {
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error('Network Connectivity Failed');
};

export const handleError = (err) => {
  console.log(`API call failed ${err}`);
  throw err;
};
