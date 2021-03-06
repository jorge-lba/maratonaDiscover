import { useContext } from 'react';
import {Td, Tr, Desc, Edit} from './styles.js'

import TransactionContext from '../../context/Transaction'
import CurrentTransactionContext from '../../context/CurrentTransaction';

import TransactionHandler from '../../Services/TransactionHandler';

const Transaction = ({ desc, value, date, id, setActive, ...rest }) => {
    const { transactions, setTransactions } = useContext(TransactionContext);
    const { setCurrentTransaction} = useContext(CurrentTransactionContext);
    const transactionHandler = new TransactionHandler(transactions);
    const HandleRemove = (e) => {
        const newTransactions = transactionHandler.removeTransaction(id);
        setTransactions(newTransactions);
    }

    const HandleUpdate = (e) => {
        const filteredTransaction = transactionHandler.findById(id)
        setCurrentTransaction(filteredTransaction);
        setActive(true)
    }

    return (
        <>
        <Tr {...rest}>
            <Desc >{desc}</Desc>
            <Td type={/^-/.test(value) ? "expense" : "income"} >{value}</Td>
            <Td >{date}</Td>
            <Td onClick={HandleRemove}>
                <img
                    className="cursor-pointer"
                    alt="delete"
                    src="/assets/minus.svg"
                    width={24}
                    height={24}
                />
            </Td>
            <Td>
                <Edit onClick={HandleUpdate}
                    className="cursor-pointer"
                    alt="Edit"
                    src="/assets/edit.svg"
                    width={24}
                    height={24}
                />
            </Td>
        </Tr>
        </>
    )
}

export default Transaction;