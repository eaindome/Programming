n = 6
p = 2
num_page_list = [i for i in range(1, n+1)]

if p in num_page_list:
    print(min(p//2, n//2-p//2))