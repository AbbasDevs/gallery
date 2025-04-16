import { create } from "zustand";
import { persist } from "zustand/middleware";

// useAuthStore: This is a custom hook generated by zustand that will manage the authentication state.
const useAuthStore = create(
  // The persist middleware will ensure that the store's state is saved in local storage.
  // This means that the user's login status will be remembered across page refreshes and browser sessions.
  persist(
    (set) => ({
      // currentUser: This state variable holds the information about the currently logged-in user.
      //   - It is initially 'null', meaning no user is logged in.
      //   - It will be an object containing user details (e.g., id, username, email) when a user logs in.
      currentUser: null,

      // setCurrentUser: This function updates the 'currentUser' state.
      //   - It takes 'newUser' (an object with user information) as an argument.
      //   - It sets the 'currentUser' state to the provided 'newUser'.
      setCurrentUser: (newUser) => set({ currentUser: newUser }),

      // removeCurrentUser: This function logs the current user out.
      //   - It sets the 'currentUser' state back to 'null'.
      removeCurrentUser: () => set({ currentUser: null }),

      // updateCurrentUser: This function is used to update the properties of the current user.
      //   - It takes 'updatedUser' (an object with updated user information) as an argument.
      //   - It merges the updated values with the current user object.
      updateCurrentUser: (updatedUser) => set({ currentUser: updatedUser }),
    }),
      {
        name: 'user-storage', // unique name
      }
  )
);

export default useAuthStore; // Export the custom hook for use in other components.
