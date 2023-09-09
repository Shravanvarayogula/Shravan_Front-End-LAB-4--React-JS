// We use JSX Fragements within this ts file and we use the tsx extension.
import React, {useEffect} from "react";
import { getAllExpenseItems } from "../services/expense";

const ExpenseTracker = () => {

useEffect(() => {
    const getAllExpenseInvoker = async () => {
       const responseData = await getAllExpenseItems();
       console.log(responseData);
    }
    getAllExpenseInvoker();
}, [])
    return (
        <div>
            Expense Tracker Created..
        </div>
    )
}

export  {ExpenseTracker};