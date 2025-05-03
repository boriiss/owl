import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../../api/fakerApi';
import type { RootState } from '../../store/store';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  searchTerm: string;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
  searchTerm: '',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page: number, { getState }) => {
    const state = getState() as RootState;
    const response = await getProducts(page, state.products.itemsPerPage);
    return response;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.filteredItems = state.items.filter((product) =>
        product.name.toLowerCase().includes(action.payload.toLowerCase()) ||
        product.description.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
        state.totalItems = 100; // API не возвращает общее количество, используем фиктивное значение
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setPage, setSearchTerm } = productsSlice.actions;

export const selectFilteredProducts = (state: RootState) => {
  const { filteredItems, currentPage, itemsPerPage } = state.products;
  const startIndex = (currentPage - 1) * itemsPerPage;
  return filteredItems.slice(startIndex, startIndex + itemsPerPage);
};

export default productsSlice.reducer;