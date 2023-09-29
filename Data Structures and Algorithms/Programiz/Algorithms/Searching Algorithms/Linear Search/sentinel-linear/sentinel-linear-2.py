def sentinelLinearSearch(array, key):
	last = array[len(array) - 1]
	array[len(array) - 1] = key
	i = 0
	while array[i] != key:
		i += 1
	array[len(array) - 1] = last
	if i < len(array) - 1 or last == key:
		return i
	else:
		return -1

array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
key = 5
index = sentinelLinearSearch(array, key)
if index == -1:
	print(f"{key} is not found in the array: {array}")
else:
	print(f"{key} is found at index {index} in the array: {array}")

