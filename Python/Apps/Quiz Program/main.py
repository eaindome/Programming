# a dictionary that stores questions and answers
# loop throught that dictionary that tracks the score of the user
# loop through the dictionary using the key values pairs
# display each question to the user
# tell them if they are right or wrong
# show the final result when quiz is completed

from quiz import quiz

score = 0
count = 0
for key, value in quiz.items():
    print(value['question'])
    answer = input("Answer: ")

    if answer.lower() == value['answer'].lower():
        score += 1
        print("Correct\n"
              f"Score: {score}")
    else:
        print("Wrong")
        print(f"The answer is: {value['answer']}")
    
    count += 1

final_score  = (score / count) * 100
print(f"Final Score = {score} / {count}\n"
      f"Final Score = {final_score}")


