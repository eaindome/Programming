'''
Create a Temprature class. Make two methods :
1. convertFahrenheit - It will take celsius and will print it into Fahrenheit.
2. convertCelsius - It will take Fahrenheit and will convert it into Celsius.
'''
class Temperature:
    def convertFahrenheit(self, celsius):
        fahrenheit = (celsius * 9/5) + 32
        print(f"{celsius} degrees Celsius is equal to {fahrenheit} degress Fahrenheit")

    def convertCelsius(self, fahrenhiet):
        celsius = (fahrenhiet - 32) * (5/9)
        print(f"{fahrenhiet} degrees Fahrenheit is equal to {celsius} degrees Celsius")


class Temperature2:
    def __init__(self, value, unit):
        self.value = value
        self.unit = unit

        def convertFahrenheit(self):
            if self.unit == "Celsius":
                return (self.celsius * (9/5)) + 32
            else:
                return self.value
        
        def convertCelsius(self):
            if self.unit == "Fahrenheit":
                return (self.fahrenheit - 32) * (5/9)
            else:
                return self.value

# Example usage for Temperature
temp_converter = Temperature()

# convert celsius to fahrenheit
temp_converter.convertFahrenheit(25)

# convert fahrenheit to celsius
temp_converter.convertCelsius(77)



# Example usage for Temperature 2
temp1 = Temperature2(25, "Celsius")
print(f"{temp1.value} degrees {temp1.unit} is equal to {temp1.convertFahrenheit()} degrees Fahrenheit")

temp2 = Temperature2(77, "Fahrenheit")
print(f"{temp1.value} degrees {temp1.unit} is equal to {temp1.convertCelsius()} degrees Celsius")




'''
Solution:
class Temprature():
  def  convertFahrenhiet(self,celsius):
    return (celsius*(9/5))+32
  def convertCelsius(self,farenhiet):
    return (farenhiet-32)*(5/9)
'''