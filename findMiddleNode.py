# define a function to find the middle node of a singly linked list

# input: head node of the linked list
# output: middle node of the linked list

# slow and fast pointer algorithm

# 1- initialize two pointers slow and fast to the head of the linked list.
# 2- loop the linked list using the fast pointer twice as fast as the slow pointer where fast pointer is incremented by 2 and slow only by 1.
# 3- when the fast pointer reaches the end of the linked list, the slow pointer will be pointing to the middle node.
# 4- return the slow pointer as the middle node.

# Implementation


# Define Linked List and its node contents

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Function to return middle node


def middleNode(head: ListNode) -> ListNode:
    # set slow and fast to the head of linked list
    slow = head
    fast = head
    # loop through list and have checking condition that the current and next nodes are not null
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
