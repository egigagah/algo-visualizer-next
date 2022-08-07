export class Node<T> {
    value: T | null = null;
    next: Node<T> | null = null;
    constructor(val: T) {
        this.value = val ?? null;
        this.next = null;
    }
}

export class LinkedList<T> {
    head: Node<T> | null = null;
    tail: Node<T> | null = null;
    size = 0;

    constructor(val?: T) {
        this.head = val ? new Node(val) : null;
        this.tail = val ? new Node(val) : null;
        this.size = val ? 1 : 0;
    }

    addHead(val: T): void {
        try {
            const currNode = new Node(val);
            if (!this.head) {
                this.head = currNode;
                this.tail = currNode;
            } else {
                currNode.next = this.head;
                this.head = currNode;
            }
            this.size += 1;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    addTail(val: T): void {
        try {
            if (this.tail && this.head) {
                const currNode = new Node(val);
                if (this.size < 2) {
                    this.head.next = currNode;
                } else {
                    const node = this.traverse(this.size);
                    if (node) {
                        node.next = currNode;
                        this.tail = currNode;
                    }
                }
                this.size += 1;
            } else this.addHead(val);
        } catch (error) {
            throw new Error(error as string);
        }
    }

    deleteHead(): void {
        try {
            if (this.size > 0 && this.head) {
                this.head = this.head.next;
                if (this.size < 2) this.tail = this.head;
                --this.size;
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    deleteTail(): void {
        try {
            if (this.size > 1 && this.tail) {
                const node = this.traverse(this.size - 1);
                if (node?.next) {
                    node.next = node?.next?.next;
                    this.tail = this.head;
                    --this.size;
                }
            } else this.deleteHead();
        } catch (error) {
            throw new Error(error as string);
        }
    }

    private traverse(len: number) {
        let node = this.head;
        let n = 1;
        while (n < len && node?.next) {
            node = node.next;
            n++;
        }
        return node;
    }
}

export class NodeDouble<T> {
    value: T | null = null;
    next: NodeDouble<T> | null = null;
    prev: NodeDouble<T> | null = null;
    constructor(val: T) {
        this.value = val ?? null;
        this.next = null;
        this.prev = null;
    }
}

export class DoubleLinkedList<T> {
    head: NodeDouble<T> | null = null;
    tail: NodeDouble<T> | null = null;
    size = 0;

    constructor(val?: T) {
        this.head = val ? new NodeDouble(val) : null;
        this.tail = val ? new NodeDouble(val) : null;
        this.size = val ? 1 : 0;
    }

    addHead(val: T): void {
        const currNode = new NodeDouble(val);
        if (!this.head) {
            this.head = currNode;
            this.tail = currNode;
        } else {
            if (this.size < 2 && this.tail) this.tail.prev = currNode;
            currNode.next = this.head;
            this.head.prev = currNode;
            this.head = currNode;
        }
        this.size += 1;
    }

    addTail(val: T): void {
        if (this.tail && this.head) {
            const currNode = new NodeDouble(val);
            if (this.size < 2) this.head.next = currNode;
            currNode.prev = this.tail;
            this.tail.next = currNode;
            this.tail = currNode;
            this.size += 1;
        } else this.addHead(val);
    }

    deleteHead(): void {
        if (this.size > 0 && this.head) {
            if (this.size > 1 && this.head.next) this.head.next.prev = null;
            this.head = this.head.next;
            --this.size;
        }
    }

    deleteTail(): void {
        if (this.size > 0 && this.tail) {
            this.tail = this.tail.prev;
            --this.size;
        }
    }
}
