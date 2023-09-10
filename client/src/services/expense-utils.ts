import IExpenseItem from '../models/Expense'

const getAllPayeeNames = (expenseItems: IExpenseItem[]) => {
    const uniquePayeeNames : string[] =[];
    expenseItems.forEach((item) => {
        let payeeName = item.payeeName;
        if(!uniquePayeeNames.includes(payeeName)) {
            uniquePayeeNames.push(payeeName);
        }
    })
    return uniquePayeeNames;
}

export {getAllPayeeNames};