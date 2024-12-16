<template>
    <div class="inc-exp-container">
        <div>
            <h4>Income</h4>
            <p id="money-plus" class="money plus">+${{ income }}</p>
        </div>
    </div>
    <div>
        <h4>Expense</h4>
        <p id="money-minus" class="money minus">-${{ expenses }}</p>
    </div>
</template>

<script setup>
    const props = {
        income: {
            type: Number,
            required: true,
        },
        expenses: {
            type: Number,
            required: true,
        }
    };
</script>