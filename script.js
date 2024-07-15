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

  const apiKey = '4425f73eeccdeca7f74739d23ac7d8ba701c88df'; // Replace with your Hunter API key
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

    // Extract specific key-value pairs
    const extractedData = {
      status: data.data.status,
      result: data.data.result,
      email: data.data.email,
      score: data.data.score,
      mx_records: data.data.mx_records
    };

    // Format the extracted data as a string
    let formattedData = '';
    for (const [key, value] of Object.entries(extractedData)) {
      formattedData += `${key}: ${value}\n`;
    }

    // Display the formatted data in the result div
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
    document.getElementById('ipOutput').innerText = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    document.getElementById('ipOutput').innerText = 'Error: ' + error.message;
  }
}

// CRYPTO ANALYSIS

document.getElementById('cryptoFetch').addEventListener('click', cryptoFetchData);

async function cryptoFetchData() {
  const cryptoInput = document.getElementById('cryptoInput').value.trim(); // Trim any leading/trailing spaces
  console.log(cryptoInput); // Log the crypto input to the console

  if (!cryptoInput) {
    console.error('Please enter a cryptocurrency name');
    document.getElementById('cryptoOutput').innerText = 'Error: Please enter a cryptocurrency name';
    return;
  }

  const apiKey = '60942143-ef0d-4d47-82ec-2dad1a36b155';
  const apiURL = `https://api.cryptocurrency.com/v1/cryptocurrency/quotes/latest?symbol=${encodeURIComponent(cryptoInput)}&CMC_PRO_API_KEY=${apiKey}`;
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

    // Check if the data exists and extract specific key-value pairs
    if (data.data && data.data[cryptoInput]) {
      const extractedData = {
        name: data.data[cryptoInput].name,
        symbol: data.data[cryptoInput].symbol,
        price: data.data[cryptoInput].quote.USD.price,
        market_cap: data.data[cryptoInput].quote.USD.market_cap,
        volume_24h: data.data[cryptoInput].quote.USD.volume_24h,
        percent_change_1h: data.data[cryptoInput].quote.USD.percent_change_1h,
        percent_change_24h: data.data[cryptoInput].quote.USD.percent_change_24h,
        percent_change_7d: data.data[cryptoInput].quote.USD.percent_change_7d
      };

      // Format the extracted data as a string
      let formattedData = '';
      for (const [key, value] of Object.entries(extractedData)) {
        formattedData += `${key}: ${value}\n`;
      }

      // Display the formatted data in the result div
      document.getElementById('cryptoOutput').innerText = formattedData;
    } else {
      document.getElementById('cryptoOutput').innerText = 'Error: Cryptocurrency not found';
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    document.getElementById('cryptoOutput').innerText = 'Error: ' + error.message;
  }
}
