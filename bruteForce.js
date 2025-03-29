function bruteForceFindStartStation(gas, cost) {
    const totalStations = gas.length;

    for (let startingStation = 0; startingStation < totalStations; startingStation++) {
        let currentGasInTank = 0;
        let isValidStart = true;
        for (let stepsTaken = 0; stepsTaken < totalStations; stepsTaken++) {
            const currentStation = (startingStation + stepsTaken) % totalStations;
            currentGasInTank += gas[currentStation] - cost[currentStation];
            if (currentGasInTank < 0) {
                isValidStart = false;
                break;
            }
        }

        if (isValidStart) {
            return startingStation;
        }
    }
    return -1;
}

