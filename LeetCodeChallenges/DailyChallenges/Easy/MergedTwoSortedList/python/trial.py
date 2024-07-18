list1 = [] 
list2 = [0]

list3 = list1 + list2
list3.sort()
sorted_list = sorted(list3)

print(f"sorted list 1: {list3}")
print(f"sorted list 2: {sorted_list}")

# prime_numbers = [11, 3, 7, 5, 2]

# # sort the list in ascending order
# prime_numbers.sort()

# print(prime_numbers)

# # Output: [2, 3, 5, 7, 11]

# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

# def mergeTwoLists(list1: ListNode, list2: ListNode) -> ListNode:
#     # Create a dummy node to act as the starting point of the merged list
#     dummy = ListNode()
#     current = dummy

#     # Traverse both lists
#     while list1 and list2:
#         if list1.val < list2.val:
#             current.next = list1
#             list1 = list1.next
#         else:
#             current.next = list2
#             list2 = list2.next
#         current = current.next

#     # If one list is exhausted, append the remaining nodes of the other list
#     if list1:
#         current.next = list1
#     elif list2:
#         current.next = list2

#     # Return the merged list starting from the next of the dummy node
#     return dummy.next

# # Helper function to print the list (for testing purposes)
# def printList(node):
#     while node:
#         print(node.val, end=" -> ")
#         node = node.next
#     print("None")

# # Test the function
# list1 = ListNode(1, ListNode(2, ListNode(4)))
# list2 = ListNode(1, ListNode(3, ListNode(4)))

# merged_list = mergeTwoLists(list1, list2)
# printList(merged_list)
