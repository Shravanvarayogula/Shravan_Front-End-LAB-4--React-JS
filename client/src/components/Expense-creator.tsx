import { Button, Modal, Form } from "react-bootstrap";
import { FormEvent, useRef, useState } from "react";
import { getAllPayeeNames } from "../services/expense-utils";
import IExpenseItem, { IExpenseCreateItem } from "../models/Expense"; 
import { saveExpenseItem } from "../services/expense";
import moment from "moment";


type ExpenseCreatorModel = {
    expenseItems : IExpenseItem[];
    refreshParent : (newExpenseItem : IExpenseItem) => void,
}

const ExpenseCreator = ({expenseItems,refreshParent} :ExpenseCreatorModel ) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // Creating use refs to map to relevant input elements
    const expenseDescRef = useRef<HTMLInputElement>(null);
    const payeeRef = useRef<HTMLSelectElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);


    const handleAddExpense = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Collecting info from the form here using useRef
        console.log(`${expenseDescRef?.current?.value}`);
        console.log(`${payeeRef?.current?.value}`);
        console.log(`${priceRef?.current?.value}`);

        const newExpenseItem: IExpenseCreateItem = {
            // type conversion as per declaration in the the initial type
            expenseDescription : expenseDescRef?.current?.value as string,
            payeeName : payeeRef?.current?.value as string,
            price : parseFloat(priceRef?.current?.value as string),
            date : moment(new Date()).format('YYYY-MM-DD')
        }
       const updatedExpenseItem = await saveExpenseItem(newExpenseItem)
       console.log(updatedExpenseItem);
       refreshParent(updatedExpenseItem)

        handleClose();
    }

    return (
        <>  
            <Button variant="primary" className="float-end" onClick={handleShow}> Add New Expense Item </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Expense Item </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddExpense}>
                        <Form.Group className="mb-3" controlId="expenseDescription">
                            <Form.Label>Expense Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter Expense Description" ref={expenseDescRef}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="payeeName">
                            <Form.Label>Payee Name</Form.Label>
                            <Form.Select aria-label="Default select example" ref={payeeRef}>
                                <option>--Select the Payee --</option>
                                {
                                    getAllPayeeNames(expenseItems).map((payeeName) => {
                                        return <option value={payeeName}> {payeeName} </option>

                                    })
                                }


                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="priceInformation">
                            <Form.Label>Price </Form.Label>
                            <Form.Control type="number" placeholder="Enter Amount"  ref={priceRef}/>
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Add Expense
                        </Button>

                        <Button variant="secondary" onClick={handleClose} className="float-right">
                            Close
                        </Button>
                    </Form>

                </Modal.Body>
            </Modal>
        </>

    );

}

export { ExpenseCreator }