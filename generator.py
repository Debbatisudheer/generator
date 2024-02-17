import random
import time

# Generator function for simulating temperature readings
def temperature_sensor():
    while True:
        # Simulate temperature readings between 0 and 100 degrees Celsius
        temperature = random.uniform(0, 100)
        yield temperature
        time.sleep(1)  # Simulate data arriving every second

# Generator function for calculating average temperature
def calculate_average_temperature(sensor, window_size):
    total_temperature = 0
    count = 0
    for temperature in sensor:
        total_temperature += temperature
        count += 1
        if count == window_size:
            yield total_temperature / window_size
            total_temperature = 0
            count = 0

# Generator function for generating temperature alerts
def generate_temperature_alerts(sensor, threshold):
    for temperature in sensor:
        if temperature > threshold:
            yield f"High temperature alert! Temperature is {temperature:.2f} degrees Celsius."

# Main function
def main():
    sensor = temperature_sensor()  # Create temperature sensor generator
    window_size = 5  # Window size for calculating average temperature
    threshold = 80  # Threshold for temperature alerts

    print("Monitoring temperatures...")
    print("Press Ctrl+C to stop.")

    try:
        # Continuously monitor temperature readings and generate alerts
        for avg_temperature in calculate_average_temperature(sensor, window_size):
            print(f"Average temperature: {avg_temperature:.2f} degrees Celsius")
            for alert in generate_temperature_alerts(sensor, threshold):
                print(alert)
    except KeyboardInterrupt:
        print("Monitoring stopped.")

if __name__ == "__main__":
    main()