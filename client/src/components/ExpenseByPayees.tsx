import { Table } from "react-bootstrap"
import IExpenseItem from "../models/Expense"

type ExpenseByPayeeModel = {
    expenseItems : IExpenseItem[]
}

const ExpenseByPayees = ( {expenseItems} : ExpenseByPayeeModel) => {

    const getAllPayeeNames = () => {
        const uniquePayeeNames : string[] =[];
        expenseItems.forEach((item) => {
            let payeeName = item.payeeName;
            if(!uniquePayeeNames.includes(payeeName)) {
                uniquePayeeNames.push(payeeName);
            }
        })
        return uniquePayeeNames;
    }

    const getTotalExpenseByPayee = (payeeName: string) => {
         let totalExpense = 0 ;
            expenseItems.forEach((item) => {
                if (item.payeeName === payeeName){
                    totalExpense+=  item.price;
                }   
            })
            return totalExpense;
    }
    return (
        <>
    <h2 className="heading"> Expense By Payees  </h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Payee Name</th>
          <th>Total Expenses </th>
        </tr>
      </thead>
      <tbody>
      {
        getAllPayeeNames().map((payeeName, index) => (
            <tr key={index+1}> 
                <td> {index+1} </td>
                <td> {payeeName} </td>
                <td> {getTotalExpenseByPayee(payeeName)} </td>
            </tr>
             ))
        }
      </tbody>
      </Table>
     </>
    )
}

export {ExpenseByPayees};