
// This component should handle the incoming expense items from the expense tracker and display

import IExpenseItem from "../models/Expense"
import { Table } from "react-bootstrap"

//Have a generic model for items incoming and to support any new additions later on

type ExpenseItemModel = {
    expenseItems : IExpenseItem[];
}

const ExpenseItems = ( {expenseItems} : ExpenseItemModel) => {
    return(
    <>
    <h2 className="heading"> Expense Management Application </h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Expense Description</th>
          <th>Payee Name</th>
          <th>Date</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
      {
        expenseItems.map((expenseItem, index) => (
            <tr key={expenseItem.id}> 
                <td> {index+1} </td>
                <td> {expenseItem.expenseDescription} </td>
                <td> {expenseItem.payeeName} </td>
                <td> {expenseItem.date.toString()} </td>
                <td> {expenseItem.price} </td>
            </tr>
             ))
        }
      </tbody>
      </Table>
     </>
    )
}

export {ExpenseItems}

