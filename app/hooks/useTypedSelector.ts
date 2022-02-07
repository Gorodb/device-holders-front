import {TypedUseSelectorHook, useSelector, useDispatch} from "react-redux";
import {TypeRootState} from "../store/store";

export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector
