// Service to make requests to back end

import axios from "axios";
import IExpenseItem, { IExpenseCreateItem } from "../models/Expense";

const baseAPIUrl = "http://localhost:4000/items";

// Axios calls returns a promise that we need to handle using the aync and await
 
const getAllExpenseItems = async () => {
    const responseData =  await axios.get <IExpenseItem[]>(baseAPIUrl);
    return responseData.data
}

// Input parameters payeename, price, description 
const saveExpenseItem = async (expenseCreateItem : IExpenseCreateItem) => {
    const responseData = await axios.post<IExpenseItem>(
        baseAPIUrl, 
        expenseCreateItem,
        {
            headers : {
                'Content-Type' : 'application/json',
            }
        }
        );
    return responseData.data; 
}

export {getAllExpenseItems, saveExpenseItem};    