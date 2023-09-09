class Queue<T> {
    private storage: T[] = [];
    private capacity: number = Infinity;

    constructor(capacity: number = Infinity) {
        this.capacity = capacity;
    }

    public size(): number {
        return this.storage.length;
    }

    public enqueue(item: T): void {
        if (this.size() === this.capacity) {
            throw Error(
                "Queue has reached max capacity, you cannot add more items"
            );
        }
        this.storage.push(item);
    }

    public dequeue(): T | undefined {
        return this.storage.shift();
    }

    public getCapacity(): number {
        return this.capacity;
    }

    public getData(): T[] {
        return this.storage;
    }

    public getNext(): T | undefined {
        return this.storage[0];
    }
}

export default Queue;
