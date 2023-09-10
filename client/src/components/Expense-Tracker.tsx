// We use JSX Fragements within this ts file and we use the tsx extension.
import React, { useEffect, useState } from "react";
import { getAllExpenseItems } from "../services/expense";
import IExpenseItem from "../models/Expense";
import { Alert, Spinner, Container } from "react-bootstrap";
import { ExpenseItems } from "./Expense-Items";
import {ExpenseByPayees} from './ExpenseByPayees'
import { ExpenseCreator } from "./Expense-creator";
const ExpenseTracker = () => {

    // Managing the state when a new item is added/removed from the list using useState hook

    const [expenseItems, setExpenseItems] = useState<IExpenseItem[]>([]);

    // With JS when there is an error we can throw a custom error message
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getAllExpenseInvoker = async () => {
            try {
                const responseData = await getAllExpenseItems();
                console.log(responseData);
                setExpenseItems(responseData);
            }
            catch (error) {
                setError(error as Error);
                console.log(error);
            }
            finally {
                setLoading(false);
            }

        }
        getAllExpenseInvoker();
    }, []);

        const refreshParent = (newExpenseItem : IExpenseItem) => {
            setExpenseItems([
                ...expenseItems,
                newExpenseItem
            ])
        }

    return (

        <Container className="my-4">
            <h2 className="heading"> Expense Management Application 
            <ExpenseCreator expenseItems={expenseItems} refreshParent = {refreshParent}></ExpenseCreator>
            
            </h2>


            {
                loading && (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading Expense Tracking Details</span>
                    </Spinner>
                )
            }
            {
                error && !loading && (
                    <Alert variant="danger">
                        {error.message}
                    </Alert>
                )
            }
            {
                !error && !loading && (
                    <ExpenseItems expenseItems={expenseItems}></ExpenseItems>
                )
            }

         {
                !error && !loading && (
                    <ExpenseByPayees expenseItems={expenseItems}></ExpenseByPayees>
                )
            }
        </Container>
    )
}

export { ExpenseTracker };