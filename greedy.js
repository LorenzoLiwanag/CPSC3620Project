const greedyFindStartStation = (gas, cost) => {
    const n = gas.length; // Number of gas stations
    let totalGas = 0; // Total gas available across all stations
    let totalCost = 0; // Total gas cost to complete the circle
    let currentGas = 0; // Current gas amount while traversing stations
    let start = 0;


    // Traverse all stations once
    for (let i = 0; i < n; i++) {
        totalGas += gas[i];
        totalCost += cost[i];
        currentGas += gas[i] - cost[i];

        /*If the current gas amount becomes < 0
        a full tour starting from the start is not possible
        reset the starting point to the next station = i+1*/

        if (currentGas < 0) {
            start = i + 1;
            currentGas = 0;
        }
    }

    if (totalGas < totalCost) {
        return false;
    }
    else {
        return start;
    }
}


//Unit tests to verify correctneess and verify correct return output
const unitTests = [
    {
        gas: [1, 2, 3, 4, 5],
        cost: [3, 4, 5, 1, 2],
        expected: 3,
        description: "Case with valid solution"
    },
    {
        gas: [2, 3, 4],
        cost: [3, 4, 3],
        expected: -1,
        description: "No valid start (totalGas < totalCost)"
    },
    {
        gas: [5, 1, 2, 3, 4],
        cost: [4, 4, 1, 5, 1],
        expected: 4,
        description: "Case with other valid solution"
    },
    {
        gas: [1, 1, 1, 1],
        cost: [1, 1, 1, 1],
        expected: 0,
        description: "All stations can be a valid start."
    },
    {
        gas: [0, 0, 0],
        cost: [0, 0, 0],
        expected: 0,
        description: "Edge case: zero gas, zero cost"
    }
];

//simulate unit tests
unitTests.forEach((test, index) => {
    const result = greedyFindStartStation(test.gas, test.cost);
    const passed = result === test.expected;
    console.log(`Test ${index + 1}: ${test.description} → ${passed ? "PASSED" : "FAILED"} (Expected: ${test.expected}, Actual: ${result})`);
});


//generate gas and cost arrays of length n to simulate greedy algorithm
const generateGasAndCostArrays = (n, gasMax = 1000, costMax = 1000) => {
    const gas = Array.from({ length: n }, () => Math.floor(Math.random() * gasMax));
    const cost = Array.from({ length: n }, () => Math.floor(Math.random() * costMax));
    return { gas, cost };
}

const testAlgorithm = (n) => {
    const { gas, cost } = generateGasAndCostArrays(n);

    const startTime = performance.now(); // Start timer
    const result = greedyFindStartStation(gas, cost);
    const endTime = performance.now(); // End timer

    const duration = (endTime - startTime).toFixed(4);
    console.log(`n = ${n} ,  Time: ${duration} ms | Result: ${result}`);
}

//stress test to simulate diffent n amounts of stations 
const runTests = () => {
    const sizes = [10, 100, 1000, 5000, 10000, 50000, 100000];
    
    for (const n of sizes) {
        testAlgorithm(n);
    }
}


runTests();






