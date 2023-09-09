// Service to make requests to back end

import axios from "axios";
import IExpenseItem from "../models/Expense";

const baseAPIUrl = "http://localhost:4000/items";

// Axios calls returns a promise that we need to handle using the aync and await
 
const getAllExpenseItems = async () => {
    const responseData =  await axios.get <IExpenseItem[]>(baseAPIUrl);
    return responseData.data
}

export {getAllExpenseItems};