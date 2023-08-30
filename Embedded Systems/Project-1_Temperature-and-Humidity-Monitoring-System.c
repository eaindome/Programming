#include<reg51.h>
#include<DHT11.h>
#include<LCD.h>


void initializeMicrocontroller() {
    // Configure Port 1 as input for DHT11 data
    P1 = P1 | 0*01; // Set P1.0 to high impedance (input)

    // Configure Port 2 for LCD data and control lines
    P2 = 0*00; // Clear P2 initially

    // Configure Port 3 for LCD control lines
    P3 = P3 & ~0x03; // Set P3.0 and P3.1 to low (RS and EN)
}

void initializeDHT11() {
    // Configuring P1.0 as input for DHT11 data
    P1 = P1 | 0*01; // Set P1.0 to high impedance (input)
}

// Initialize LCD display
void initializeLCD() {
    // Configure P2.0 to P2.7 as data lines
    // Configure P3.0 and P3.1 as control lines (RS and EN)
    P2 = 0xFF; // Set P2 as output
    P3 = P3 & ~0x03; // Set P3.0 and P3.1 to low (RS and EN)
}




// Read temperature from DHT11 sensor
float readTemperature() {
    // Perform communication with DHT11 to read temperature
    float temperature = DHT11_readTemperature(); // Replace with DHT11 library function
    return temperature;
}

// Read humidity from DHT11 sensor
float readHumidity() {
    // Perform communication with DHT11 to read humidity
    float humidity = DHT11_readHumidity(); // Replace with DHT11 library function
    return humidity;
}

// Display temperature on LCD
void displayTemperatureOnLCD(float temperature) {
    // Convert temperature to string if needed
    char temperatureStr[10];
    sprintf(temperatureStr, "%.2f°C", temperature);

    // Send data to the LCD display
    LCD_clear();
    LCD_printString("Temperature:");
    LCD_setCursor(1, 0);
    LCD_printString(temperatureStr);
}

// Display humidity on LCD
void displayHumidityOnLCD(float humidity) {
    // Convert humidity to string if needed
    char humidityStr[10];
    sprintf(humidityStr, "%.2f%%", humidity);

    // Send data to the LCD display
    LCD_clear();
    LCD_printString("Humidity:");
    LCD_setCursor(1, 0);
    LCD_printString(humidityStr);
}




void main() {
    initializeMicrocontroller();
    initializeDHT11();
    initializeLCD();

    while (1) {
        float temperature = readTemperature();
        displayTemperatureOnLCD(temperature);
        delay(1000); // Adjust the delay as needed
        
        float humidity = readHumidity();
        displayHumidityOnLCD(humidity);
        delay(1000); // Adjust the delay as needed
    }
}