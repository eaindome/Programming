s = "rat" 
t = "car"


s_list = list(s)
t_list = list(t)

if len(s_list) != len(t_list):
    print("False")
else:
    for i in s_list:
        if i in t_list:
            t_list.remove(i)

    if len(t_list) == 0:
        print("True")
    else:
        print("False")




