class Queue:
    def __init__(self, capacity):
        self.capacity = capacity
        self.front = 0
        self.rear = -1
        self.size = 0
        self.array = [None] * capacity

    def is_empty(self):
        return self.size == 0

    def is_full(self):
        return self.size == self.capacity

    def enqueue(self, value):
        if self.is_full():
            raise Exception("Queue is full")

        self.rear = (self.rear + 1) % self.capacity
        # self.rear point to the new last element in the queue after enqueuing an element,
        # and wraps around to 0 if it reaches the end of the array
        self.array[self.rear] = value
        self.size += 1

    def dequeue(self):
        if self.is_empty():
            raise Exception("Queue is empty")

        value = self.array[self.front]
        self.array[self.front] = None
        self.front = (self.front + 1) % self.capacity
        # self.front to point to the new first element in the queue after dequeuing an element,
        # and wraps around to 0 if it reaches the end of the array.
        self.size -= 1

        return value


# The time complexity for the enqueue() and dequeue() operations in this implementation is O(1),
# as they only involve adding or removing an element from the rear or front of the queue respectively,
# and updating the relevant pointers.

# To implement a Max Priority Queue, we can modify the above implementation by changing the
# way we enqueue and dequeue elements. Instead of simply adding elements to the rear and removing
# them from the front, we'll need to keep the elements sorted based on their priority,
#  with the highest priority element at the front.

# Here's an outline of the changes we can make:

class MaxPriorityQueue:
    def __init__(self, capacity):
        self.capacity = capacity
        self.size = 0
        self.array = [None] * capacity

    def is_empty(self):
        return self.size == 0

    def is_full(self):
        return self.size == self.capacity

    def enqueue(self, value, priority):
        if self.is_full():
            raise Exception("Queue is full")

        # Find the index where to insert the new element based on its priority
        # starting from the far right with lowest priority
        index = self.size - 1
        while index >= 0 and self.array[index][1] < priority:
            self.array[index + 1] = self.array[index]
            index -= 1

        # Insert the new element at the correct position and increase size of queue
        self.array[index + 1] = (value, priority)
        self.size += 1

    def dequeue(self):
        if self.is_empty():
            raise Exception("Queue is empty")

        # Remove and return the element with the highest priority (at the front of the queue // far left)
        value, priority = self.array[0]
        self.array[0] = None
        # Shift the values to the left of the array , set the far most right value to none as it is
        # a duplicate and then have the size decreased by 1
        for index in range(1, self.size):
            self.array[index - 1] = self.array[index]
        self.array[self.size - 1] = None
        self.size -= 1
        # no need for priority but we may print it if you want in here
        return value


# the enqueue() operation involves finding the correct position to insert the new element based on its
#  priority, which takes O(n) time in the worst case, where n is the current size of the queue.
#  The dequeue() operation involves shifting all the elements to the left by one position after
#  removing the highest priority element, which also takes O(n) time in the worst case.

#  implementation is O(n) in the worst case. However, if the elements are added in a mostly sorted order
# the time complexity will be closer to O(1) for the enqueue() operation
#  as it will only need to compare the priority of the new element with a few elements
# before finding the correct position to insert it, resulting in a faster insertion time. Similarly,
# if the elements are removed in a mostly sorted order, the time complexity of the dequeue()
# operation will also be closer to O(1), as only a few elements will need to be shifted to the left after
# removing the highest priority element. Therefore, the actual time complexity of the enqueue()
#  and dequeue() operations in this implementation will depend on the specific characteristics
# of the data being processed.
