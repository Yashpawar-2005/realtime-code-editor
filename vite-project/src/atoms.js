import {atom} from 'recoil'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const languagee =atom({
    default:"javascript",
    key:"langg"
})

export const editortheme= atom({
    default:"vs-dark",
    key:"editortheme"
})
export const toggl =atom({
    default:true,
    key:"toggle"
})
export const editorValu=atom({
    default:"// Write your javascript code here",
    key:"editorvalue"
})
export const joinroomrole=atom({
  default:"viewer",
  key:"joinroomvalue"
})
export const createroomrole=atom({
  default:"collaborator",
  key:"createroomrole"
})
export const userdata = create(
    persist(
      (set) => ({
        user: null, // Default value is null
        setUser: (userData) => set({ user: userData }), // Method to set user data
        clearUser: () => set({ user: null }), // Method to clear user data
      }),
      {
        name: 'userdata', // Unique name for the localStorage key
        getStorage: () => localStorage, // Default is localStorage
      }
    )
  );
export const userpresent=atom({
    default:false,
    key:"userpresent"
})