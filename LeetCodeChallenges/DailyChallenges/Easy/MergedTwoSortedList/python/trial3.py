from typing import Optional, List

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        current = dummy

        while list1 and list2:
            if list1.val < list2.val:
                current.next = list1
                list1 = list1.next
            else:
                current.next = list2
                list2 = list2.next
            current = current.next

        if list1:
            current.next = list1
        elif list2:
            current.next = list2

        merged_list = []
        current = dummy.next
        while current:
            merged_list.append(current.val)
            current = current.next

        return merged_list
    
# Create test linked lists
list1 = ListNode(1, ListNode(2, ListNode(4)))
list2 = ListNode(1, ListNode(3, ListNode(4)))

# Create a Solution object
sol = Solution()

# Merge the lists and print the result
merged_list = sol.mergeTwoLists(list1, list2)
print(f"Merged List: {merged_list}")