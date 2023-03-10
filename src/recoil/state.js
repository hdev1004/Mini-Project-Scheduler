//state.js
import { atom, selector } from 'recoil';

export const valueState = atom({
  key : 'key', // 단순히 키값이지만 유니크한 값으로 설정해주어야 한다.
  default : 100 // boolean, [], {}, '' 등 설정 가능하다
})

export const loginState = atom({
    key: 'login',
    default: false
})

export const testState = selector({
    key: "mykey",
    get: ({get}) => {
        const value = get(valueState);
        return value * 15
    },
    set: ({set}, newValue) => set(valueState, (newValue / 15))
})