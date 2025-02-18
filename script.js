// EMAIL INVESTIGATION
document.getElementById('Emailfetch').addEventListener('click', emailfetchData);

async function emailfetchData() {
  const emailInput = document.getElementById('emailInput').value.trim(); // Trim any leading/trailing spaces
  console.log(emailInput); // Log the email input to the console

  if (!emailInput) {
    console.error('Please enter an Email address');
    document.getElementById('emailOutput').innerText = 'Error: Please enter an Email address';
    return;
  }

  const apiKey = '48688bbec005b2251a02d130cb6141ee117b1000'; // Updated with your Hunter.io API key
  const apiURL = `https://api.hunter.io/v2/email-verifier?email=${encodeURIComponent(emailInput)}&api_key=${apiKey}`;
  const proxyURL = `https://api.allorigins.win/get?url=${encodeURIComponent(apiURL)}`;

  try {
    const response = await fetch(proxyURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const result = await response.json();
    const data = JSON.parse(result.contents); // Parse the JSON from the proxy response
    console.log(data);

    
    const formattedData = JSON.stringify(data, null, 2);

    
    document.getElementById('emailOutput').innerText = formattedData;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    document.getElementById('emailOutput').innerText = 'Error: ' + error.message;
  }
}

// IP INVESTIGATION
document.getElementById('fetchButton').addEventListener('click', fetchData);

async function fetchData() {
  const ipInput = document.getElementById('ipInput').value.trim(); // Trim any leading/trailing spaces
  console.log(ipInput); // Log the IP input to the console

  if (!ipInput) {
    console.error('Please enter an IP address');
    document.getElementById('ipOutput').innerText = 'Error: Please enter an IP address';
    return;
  }

  const apiKey = '87aa206905a4e4';
  const apiURL = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://ipinfo.io/${ipInput}/json?token=${apiKey}`)}`;

  try {
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const result = await response.json();
    const data = JSON.parse(result.contents); // Parse the JSON from the proxy response
    console.log(data);

    // Format the data as a pretty-printed JSON string
    const formattedData = JSON.stringify(data, null, 2);

    // Display the formatted data in the result div
    document.getElementById('ipOutput').innerText = formattedData;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    document.getElementById('ipOutput').innerText = 'Error: ' + error.message;
  }
}

// CRYPTOCURRENCY ANALYSIS
document.getElementById('cryptoFetch').addEventListener('click', fetchCryptoData);

async function fetchCryptoData() {
  const cryptoInput = document.getElementById('cryptoInput').value.trim(); // Trim any leading/trailing spaces
  console.log(cryptoInput); // Log the cryptocurrency input to the console

  if (!cryptoInput) {
    console.error('Please enter a cryptocurrency address');
    document.getElementById('cryptoOutput').innerText = 'Error: Please enter a cryptocurrency address';
    return;
  }

  const clientId = '76333509-7b46-451c-9f07-7daefe1e6143'; // Replace with your Bitquery client ID
  const clientSecret = 'pEnPL6YeYE5KeOSq47P8e02flm'; // Replace with your Bitquery client secret
  const tokenUrl = 'https://oauth2.bitquery.io/oauth2/token';
  const graphqlUrl = 'https://streaming.bitquery.io/graphql';
  const corsProxyUrl = 'https://cors.bridged.cc/';

  // Step 1: Obtain an access token
  try {
    const tokenResponse = await fetch(corsProxyUrl + tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'api'
      })
    });
    console.log("Hello",tokenResponse)

    if (!tokenResponse.ok) {
      throw new Error('Failed to obtain access token: ' + tokenResponse.statusText);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    console.log('Access Token:', accessToken);

    // Step 2: Fetch cryptocurrency data using the access token
    const query = `
    {
      bitcoin {
        address(address: {is: "${cryptoInput}"}) {
          balance
          received
          spent
          transactions {
            count
          }
        }
      }
    }`;

    const apiResponse = await fetch(corsProxyUrl + graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ query })
    });

    if (!apiResponse.ok) {
      throw new Error('Network response was not ok: ' + apiResponse.statusText);
    }

    const result = await apiResponse.json(); 
    // const data = result.data.bitcoin.address[0]; // Access the first address in the response
    // console.log(data);
    console.log(result)

    // Format the data as a pretty-printed JSON string
    const formattedData = JSON.stringify(data, null, 2);

    // Display the formatted data in the result div
    document.getElementById('cryptoOutput').innerText = formattedData;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    document.getElementById('cryptoOutput').innerText = 'Error: ' + error.message;
  }
}



// MOBILE NUMBER SEARCH
document.getElementById('searchButton').addEventListener('click', searchData);

async function searchData() {
  const mobileInput = document.getElementById('mobileInput').value.trim(); // Trim any leading/trailing spaces
  console.log(mobileInput); // Log the mobile number input to the console

  if (!mobileInput) {
    console.error('Please enter a mobile number');
    document.getElementById('mobileOutput').innerText = 'Error: Please enter a mobile number';
    return;
  }

  const apiURL = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.numlookupapi.com/v1/validate/${mobileInput}`)}`;

  try {
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'kXRTnJxIZV5bH25ReO3T5oHVUVH0v0SR4MTE8eRW'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const result = await response.json();
    const data = JSON.parse(result.contents); // Parse the JSON from the proxy response
    console.log(data);

    // Format the data as a pretty-printed JSON string
    const formattedData = JSON.stringify(data, null, 2);

    // Display the formatted data in the result div
    document.getElementById('mobileOutput').innerText = formattedData;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    document.getElementById('mobileOutput').innerText = 'Error: ' + error.message;
  }
}
