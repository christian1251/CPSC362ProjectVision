export class FakeFirestore {
    private db: Record<string, any> = {}; // stores collections
  
    collection(collectionName: string) {
      if (!this.db[collectionName]) {
        this.db[collectionName] = {};
      }
      return {
        doc: (docId: string) => ({
          set: async (data: any) => {
            this.db[collectionName][docId] = data;
          },
          get: async () => {
            const data = this.db[collectionName][docId];
            return { exists: !!data, data: () => data };
          },
        }),
      };
    }
  
    reset() {
      this.db = {};
    }
  }
  