import {create} from 'zustand';

// like const [state, setState] = useState() but for global state management
export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async(newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success: false, message: "Please fill in all fields."};
        }

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                return {success: false, message: data.message || "Failed to create product."};
            }

            set((state) => ({ products: [...state.products, data.data]} ));
            return {success: true, message: "Product created successfully."};
        } catch (error) {
            console.error("createProduct request failed:", error);
            return {success: false, message: "Cannot reach the API server. Make sure the backend is running on port 5000."};
        }
    },
    fetchProducts: async() => {
        try {
            const res = await fetch("/api/products");
            const data = await res.json();

            if (!res.ok || !data.success) {
                set({ products: [] });
                return;
            }

            set({  products: data.data});
        } catch (error) {
            console.error("fetchProducts request failed:", error);
            set({ products: [] });
        }
    },
    deleteProduct: async(pid) => {
        try {
            const res = await fetch('/api/products/' + pid, {
                method: 'DELETE',
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                return {success: false, message: data.message || "Failed to delete product."};
            }

            set((state) => ({ products: state.products.filter(product => product._id !== pid) }));
            return {success: true, message: data.message};
        } catch (error) {
            console.error("deleteProduct request failed:", error);
            return {success: false, message: "Cannot reach the API server. Make sure the backend is running on port 5000."};
        }
    }
}));