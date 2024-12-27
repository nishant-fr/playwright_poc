export class ScenarioContext {
  private context: Map<string, any>;

  constructor() {
      this.context = new Map<string, any>();
  }

  // Set a value in the context with a key
  set<T>(key: string, value: T): void {
      this.context.set(key, value);
  }

  // Get a value from the context with the expected type
  get<T>(key: string): T | undefined {
      return this.context.get(key);
  }

  // Check if a key exists in the context
  has(key: string): boolean {
      return this.context.has(key);
  }

  // Clear the context
  clear(): void {
      this.context.clear();
  }
}
