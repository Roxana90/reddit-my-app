import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
const urlAPI = 'https://www.reddit.com';

export  const loadPosts = createAsyncThunk(
    "allPosts/loadPosts",
    async (path, thunkAPI) => {

        // const currentState = thunkAPI.getState();
        // console.log('Current state with postSlice:', currentState);
        // console.log('адреса фiтчу',`${urlAPI}${path}`)

        const data = await fetch(`${urlAPI}${path}`);
        const json = await data.json();
        return json.data.children.map((post) => post.data);
    }
)
const initialState = {
    posts: [],
    isLoading: false,
    hasError: false,
};
export const postsSlice = createSlice({
    name: 'allPosts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadPosts.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(loadPosts.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            });
    },

});
export default postsSlice.reducer;
