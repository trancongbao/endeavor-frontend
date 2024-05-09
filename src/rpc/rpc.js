export {rpc}

async function rpc(path, rpcMethod, rpcParams) {
  console.log(`rpc. path: ${path}, rpcMethod: ${rpcMethod}, rpcParams: ${rpcParams}`)
  return fetch(
    `http://localhost:3000/${path}`,
    {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "method": rpcMethod,
        "params": rpcParams
      })
    }
  ).then(async (response) => {
    //Response status is either 200 or 500.
    const body = await response.json();
    return body.result
  }).catch((error) => {
    console.error('Error calling rpc:', error.message);
    return undefined;
  });
}
