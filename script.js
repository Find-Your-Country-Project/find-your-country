   function fetchcountry(country) {
  return axios.get(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}


    const input = document.querySelector("#inputSearch")

    const flagImage = document.querySelector("#flagImage")
    const capital = document.querySelector("#capital")
    const population = document.querySelector("#population")
    const languages = document.querySelector("#languages")
    const currencies = document.querySelector("#currencies")
    const mapslink = document.querySelector("#mapslink")

    input.addEventListener('input', () => {
      fetchcountry(input.value)
      .then((response) => {
        //console.log(response[0].flags.png)
        flagImage.src = response[0].flags.png
        capital.textContent = response[0].capital[0]
        population.textContent = response[0].population
        const keys = Object.keys(response[0].languages);
        languages.textContent = keys[1] || keys[0]
        const curr = Object.keys(response[0].currencies)[0];
        currencies.textContent = response[0].currencies[curr].symbol
        mapslink.textContent = response[0].maps.googleMaps
      }) 
    }) 
    window.onload = function() {

   
     fetchcountry("Somalia")
      .then((response) => {
        //console.log(response[0].flags.png)
        flagImage.src = response[0].flags.png
        capital.textContent = response[0].capital[0]
        population.textContent = response[0].population
        languages.textContent = response[0].languages.som
        currencies.textContent = response[0].currencies.SOS.symbol
        mapslink.textContent = response[0].maps.googleMaps
      }) 
 }



document.querySelector('button').addEventListener('click', () => {
  const userGuess = document.querySelector('input').value.trim();

  fetch(`https://restcountries.com/v3.1/name/${userGuess}`)
    .then(res => res.json())
    .then(data => {
      const country = data[0];
      const flagUrl = country.flags.svg;

      // Clear previous flag if any
      const existingFlag = document.getElementById('country-flag');
      if (existingFlag) existingFlag.remove();

      // Create and display new flag
      const flagImg = document.createElement('img');
      flagImg.id = 'country-flag';
      flagImg.src = flagUrl;
      flagImg.alt = `${country.name.common} Flag`;
      flagImg.style.width = '150px';
      flagImg.style.marginTop = '10px';

      document.getElementById('info-container').appendChild(flagImg);
    })
    .catch(err => {
      console.error('Error fetching country data:', err);
      alert('Country not found. Try again!');
    });
});







async function getRandomCountry() {
  try {
    const res = await fetch('https://restcountries.com/v3.1/all');
    const countries = await res.json();
    const randomIndex = Math.floor(Math.random() * countries.length);
    const country = countries[randomIndex];

    return {
      name: country.name.common,
      capital: country.capital?.[0],
      population: country.population,
      languages: Object.values(country.languages).join(', '),
      currency: Object.keys(country.currencies).join(', '),
      mapsLink: country.maps.googleMaps,
      flag: country.flags?.png
    };
  } catch (error) {
    console.error("Random country fetch failed:", error);
    return null;
  }
}
async function showRandomCountry() {
  const country = await getRandomCountry();
  if (!country) return;

  document.getElementById('info-container').innerHTML = `
    <p>🌍 Country: ???</p>
    <p> Capital: ${country.capital}</p>
    <p> Population: ${country.population.toLocaleString()}</p>
    <p> Languages: ${country.languages}</p>
    <p> Currencies: ${country.currency}</p>
    <p> <a href="${country.mapsLink}" target="_blank">View on Maps</a></p>
    <img src="${country.flag}" alt="Flag of ${country.name}" style="width:100px; margin-top:10px;">
  `;

  // Store the correct answer for later comparison
  window.currentCountryAnswer = country.name;
}
function checkGuessAgainstCurrent(userGuess) {
  const correct = window.currentCountryAnswer?.toLowerCase();
  const guess = userGuess.toLowerCase();

  if (guess === correct) {
    feedback.textContent = "🎉 Correct!";
    feedback.className = "correct";
  } else {
    feedback.textContent = `❌ Nope! The correct answer was ${window.currentCountryAnswer}.`;
    feedback.className = "incorrect";
  }
}

