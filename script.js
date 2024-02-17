// Function to generate random temperature readings
function generateTemperature() {
    return Math.random() * 100; // Simulating temperature between 0 and 100 degrees Celsius
}

// Function to calculate average temperature
function calculateAverageTemperature(windowSize, temperatureBuffer) {
    let totalTemperature = 0;
    for (let temperature of temperatureBuffer) {
        totalTemperature += temperature;
    }
    return totalTemperature / windowSize;
}

// Function to display temperature and generate alerts
function displayTemperatureAndAlerts() {
    const windowSize = 5; // Window size for calculating average temperature
    const threshold = 80; // Threshold for temperature alerts

    let temperatureBuffer = [];

    setInterval(() => {
        const currentTemperature = generateTemperature();
        temperatureBuffer.push(currentTemperature);

        if (temperatureBuffer.length > windowSize) {
            temperatureBuffer.shift(); // Remove oldest temperature if buffer exceeds window size
        }

        const averageTemperature = calculateAverageTemperature(windowSize, temperatureBuffer);

        document.getElementById('temperatureDisplay').innerHTML = `Average Temperature: <span>${averageTemperature.toFixed(2)}°C</span>`;

        const alertDisplay = document.getElementById('alertDisplay');
        if (currentTemperature > threshold) {
            alertDisplay.innerHTML = `<p class="alertMessage">High temperature alert! Temperature is ${currentTemperature.toFixed(2)}°C.</p>`;
        } else {
            alertDisplay.innerHTML = ''; // Clear alert if temperature is below threshold
        }
    }, 1000); // Update every second
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', displayTemperatureAndAlerts);