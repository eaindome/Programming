<template>
    <Header />
    <div class="container">
        <Balance :total="total" />
        <IncomeExpenses
            v-bind:income="+income" 
            v-bind:expenses="+expenses" />
        <TransactionList 
            :transactions="transactions"
            @transactionDeleted="handleTransactionDeleted"
        />
        <AddTransaction
            @transactionSubmitted="handleTransactionSubmitted"
        />
    </div>
</template>

<script setup>
    import Header from './components/Header.vue';
    import Balance from './components/Balance.vue';
    import IncomeExpenses from './components/IncomeExpenses.vue';
    import TransactionList from './components/TransactionList.vue';
    import AddTransaction from './components/AddTransaction.vue';

    import { ref, computed, onMounted } from 'vue';

    import { useToast } from 'vue-toastification';
    
    const toast = useToast();
    const transactions = ref ([
        // { id: 1, text: 'Flower', amount: -20 },
        // { id: 2, text: 'Salary', amount: 300 },
        // { id: 3, text: 'Book', amount: -10 },
        // { id: 4, text: 'Camera', amount: 150 }
    ]);

    onMounted(() => {
        const savedTransactions = JSON.parse(localStorage.getItem('transactions'));

        if (savedTransactions) {
            transactions.value = savedTransactions;
        }
    });

    // get total
    const total = computed(() => {
        return transactions.value.reduce((acc, transaction) => {
            return acc + transaction.amount;
        }, 0);
    });

    // get income
    const income = computed(() => {
        return transactions.value
            .filter((transaction) => transaction.amount > 0)
            .reduce((acc, transaction) => acc + transaction.amount, 0)
            .toFixed(2);
    });

    // get expenses
    const expenses = computed(() => {
        return transactions.value
            .filter((transaction) => transaction.amount < 0)
            .reduce((acc, transaction) => acc + transaction.amount, 0)
            .toFixed(2);
    });

    // submit transaction
    const handleTransactionSubmitted = (transactionData) => {
        transactions.value.push({
            id: generateUniqueId(),
            text: transactionData.text,
            amount: transactionData.amount,
        });

        saveTransactionsToLocalStorage();

        toast.success('Transaction added successfully');
    };

    // generate unique ID
    const generateUniqueId = () => {
        return Math.floor(Math.random() * 100000000);
    };  

    // delete transaction
    const handleTransactionDeleted = (id) => {
        transactions.value = transactions.value.filter(
            (transaction) => transaction.id !== id
        );

        saveTransactionsToLocalStorage();

        toast.success('Transaction deleted successfully');
    };

    // save transactions to local storage
    const saveTransactionsToLocalStorage = () => {
        localStorage.setItem('transactions  ', JSON.stringify(transactions.value));
    };
</script>
