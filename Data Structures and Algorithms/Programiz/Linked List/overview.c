/*
Linked list Data Structure
A linked list is a linear data structure that includes a series of connected nodes. 
Here, each node stores the data and the address of the next node.

Representation of Linked List
Let's see how each node of the linked list is represented. Each node consists:

A data item
An address of another node
We wrap both the data item and the next node reference in a struct as:
    struct node
    {
        int data;
        struct node *next;
    };
Each struct node has a data item and a pointer to another struct node.

A simple linked list:

    // Initialize nodes
    struct node *head;
    struct node *one = NULL;
    struct node *two = NULL;
    struct node *three = NULL;
    sturct node *four = NULL;       // adding another node

    // Allocate memory
    one = malloc(sizeof(struct node));
    two = malloc(sizeof(struct node));
    three = malloc(sizeof(struct node));
    fourt = malloc(sizeof(struct node));

    // Assign data values
    one->data = 1;
    two->data = 2;
    three->data = 3;
    fourt->data = 4;

    // Connect nodes
    one->next = four;
    four->next = two;
    two->next = three;
    three->next = NULL;

    // Save address of first node in head
    head = one;

*/

// Linked List implementation in C
#include <stdio.h>
#include <stdlib.h>

// Creating a node
struct node {
    int value;
    struct node *next;
};

// print the linked list value
void printLinkedList(struct node *p){
    while (p != NULL){
        printf("%d", p->value);
        p = p->next;
    }
}

int main(){
    // Initialize nodes
    struct node *head;
    struct node *one = NULL;
    struct node *two = NULL;
    struct node *three = NULL;
    
    // Allocate memory
    one = malloc(sizeof(struct node));
    two = malloc(sizeof(struct node));
    three = malloc(sizeof(struct node));

    // Assign data values
    one->value = 1;
    two->value = 2;
    three->value = 3;

    // Connect nodes
    one->next = two;
    two->next = three;
    three->next = NULL;

    // Save address of first node in head
    head = one;
    printLinkedList(head);
}





