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
  default:"viewer",
  key:"createroomrole"
})
export const role=atom({
  default:"viewer",
  key:"role"
})
export const userdata = create(
    persist(
      (set) => ({
        user: null,
        setUser: (userData) => set({ user: userData }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: 'userdata',
        getStorage: () => localStorage, 
      }
    )
  );
export const userpresent=atom({
    default:false,
    key:"userpresent"
})
export const livetoggle=atom({
  default:false,
  key:"livetoggle"
})