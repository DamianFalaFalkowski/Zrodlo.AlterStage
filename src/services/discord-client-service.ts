export default class ShoppingCartService extends Service {
    items = new TrackedSet();
  
    add(item) {
      this.items.add(item);
    }
  
    remove(item) {
      this.items.remove(item);
    }
  
    empty() {
      this.items.clear();
    }
  }