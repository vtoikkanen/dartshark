export const calculateOverallAverage = () => {

}

export const calculateThreeDartAverage = () => {

}

export const calculateFirstNineAverage = () => {

}

export const calculateCheckouts = (actions: any, player: any) => {
    const checkoutPossibilities = actions.filter((action: any) => {
        let score = parseInt(player === 1 ? action.playerOneScore : action.playerTwoScore);
        return score > 50 || (score > 1 && score < 41 && score % 2 === 0);
    });

    console.log(checkoutPossibilities);

    return {
        rate: 100,
        attempts: 1 + "/" + 1
    }
}