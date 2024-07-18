class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def megeTwoLists(list1: ListNode, list2: ListNode) -> ListNode:
    # dummy node
    dummy = ListNode()
    current = dummy

    # travers both list
    while list1 and list2:
        if list1.val < list2.val:
            current.next = list1
            list1 = list1.next
        else:
            current.next = list2
            list2 = list2.next
        current = current.next

    
    # if a list is exhausted
    if list1:
        current.next = list1
    elif list2:
        current.next = list2

    # return the merged list starting from the next
    return dummy.next

# Function to print the linked list
def printList(node):
    while node:
        print(node.val, end=" -> ")
        node = node.next
    print("None")

# test function
list1 = ListNode(1, ListNode(2, ListNode(4)))
list2 = ListNode(1, ListNode(3, ListNode(4)))

print(f"list1: {printList(list1)}")
print(f"list2: {printList(list2)}")