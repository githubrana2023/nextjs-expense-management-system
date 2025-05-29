import { useAppSelector } from ".";

export const useModal = ()=>useAppSelector(state=>state.modal)