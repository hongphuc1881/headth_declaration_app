import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IForm } from '../Type';

interface FormState {
    listForm: IForm[];
}

const initialState: FormState = {
    listForm:
        JSON.parse(localStorage.getItem('covidForm') as string) === null
            ? <IForm[]>[]
            : JSON.parse(localStorage.getItem('covidForm') as string),
};
const listFormSlice = createSlice({
    name: 'listForm',
    initialState,
    reducers: {
        addForm: (state, action: PayloadAction<IForm>) => {
            state.listForm.push(action.payload);
            const listFormString = JSON.stringify(state.listForm);
            localStorage.setItem('covidForm', listFormString);
        },
        deleteFormData: (state, action) => {
            const formDataID = action.payload;
            //const formDataIndex = state.listForm.findIndex((item) => item.id === formDataID);
            //const newListForm = state.listForm.splice(formDataIndex, 1);
            state.listForm = state.listForm.filter((item) => item.id !== formDataID);
            const listFormString = JSON.stringify(state.listForm);
            localStorage.setItem('covidForm', listFormString);
        },
        updateFormData: (state, action: PayloadAction<IForm>) => {
            const formDataID = action.payload.id;
            const formDataIndex = state.listForm.findIndex((item) => item.id === formDataID);
            state.listForm[formDataIndex] = action.payload;
            const listFormString = JSON.stringify(state.listForm);
            localStorage.setItem('covidForm', listFormString);
        },
    },
});

const listFormReducer = listFormSlice.reducer;
export const { addForm, deleteFormData, updateFormData } = listFormSlice.actions;
export default listFormReducer;
