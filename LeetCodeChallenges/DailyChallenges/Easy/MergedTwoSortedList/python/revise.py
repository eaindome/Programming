global list_form

list_form = []

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def printList(node: ListNode):
    while node:
        # print(node.val, end="->")
        list_form.append(node.val)
        node = node.next
    # print("None")
    # print(f"list_form: {list_form}")
    return list_form

def mergeTwoLists(list1: ListNode, list2: ListNode):
    dummy = ListNode()
    current = dummy

    # traversing both list
    while list1 and list2:
        if list1.val < list2.val:
            current.next = list1
            list1 = list1.next
        else:
            current.next = list2
            list2 = list2.next
        current =  current.next

    if list1:
        current.next = list1
    elif list2:
        current.next = list2

    return dummy.next
        

list1 = ListNode(1, ListNode(2, ListNode(3, ListNode(4))))
list2 = ListNode(5, ListNode(6, ListNode(7, ListNode(8, ListNode(9, ListNode(10))))))

print("Merging list...")
merged_list = mergeTwoLists(list1, list2)
print(f"Merged List: {printList(merged_list)}")

# print("list1: ")
# printList(list1)
# print("list2: ")
# printList(list2)

