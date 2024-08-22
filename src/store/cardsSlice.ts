import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Card {
  id: string;
  name:string;
  username: string;
  email: string;
  address: {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: {
	  lat: string;
	  lng: string;
	};
  };
  phone: string;
  website: string;
  company: {
	name: string;
	catchPhrase: string;
	bs: string;
  };
  liked: boolean;
}

interface CardsState {
  cards: Card[];
  likedOnly: boolean;
  loading: boolean;
}

const initialState: CardsState = {
  cards: [],
  likedOnly: false,
  loading: false,
};


const loadLikesFromLocalStorage = (): Record<string, boolean> => {
	const savedLikes = localStorage.getItem('likes');
	if (savedLikes) {
	  try {
		return JSON.parse(savedLikes);
	  } catch (e) {
		console.error('Failed to parse likes from localStorage', e);
		return {};
	  }
	}
	return {};
  };
  

  const saveLikesToLocalStorage = (likes: Record<string, boolean>) => {
	try {
	  localStorage.setItem('likes', JSON.stringify(likes));
	} catch (e) {
	  console.error('Failed to save likes to localStorage', e);
	}
  };

export const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return response.data.map((item: any) => ({
	id: item.id.toString(),
	name: item.name,
	username: item.username,
	email: item.email,
	address: item.address,
	phone: item.phone,
	website: item.website,
	company: item.company,
    liked: false,
  }));
});


const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<string>) {
      const card = state.cards.find((card) => card.id === action.payload);
      if (card) {
        card.liked = !card.liked;
		 const savedLikes = loadLikesFromLocalStorage();
		 savedLikes[card.id] = card.liked;
		 saveLikesToLocalStorage(savedLikes);
      }
    },
    deleteCard(state, action: PayloadAction<string>) {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
      const savedLikes = loadLikesFromLocalStorage();
      delete savedLikes[action.payload];
      saveLikesToLocalStorage(savedLikes);
    },
    toggleFilter(state) {
      state.likedOnly = !state.likedOnly;
    },
  },
  extraReducers: (builder) => {
	builder
	  .addCase(fetchCards.pending, (state) => {
		state.loading = true; 
	  })
	  .addCase(fetchCards.fulfilled, (state, action) => {
		state.cards = action.payload;
		const savedLikes = loadLikesFromLocalStorage();
		state.cards.forEach(card => {
		  card.liked = savedLikes[card.id] || false;
		});
		state.loading = false; 
	  })
	  .addCase(fetchCards.rejected, (state) => {
		state.loading = false; 
	  });
  },
});

export const { toggleLike, deleteCard, toggleFilter } = cardsSlice.actions;
export default cardsSlice.reducer;
