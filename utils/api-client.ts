type MortgageArguments = {
  principal: number;
  annualInterestRate: number;
  termOfLoan: number;
};

export type MortgageData = {
  dollars: number;
  cents: number;
};

type JSONResponse = {
  monthlyPayment?: string;
  error?: string;
};

function fetchMortgage({
  principal,
  annualInterestRate,
  termOfLoan,
}: MortgageArguments): Promise<MortgageData> {
  let url = ` /api/mortgageCalculation/?principal=${encodeURIComponent(
    principal
  )}&annualInterestRate=${encodeURIComponent(
    annualInterestRate
  )}&termOfLoan=${encodeURIComponent(termOfLoan)}`;

  return window
    .fetch(url, {
      method: 'POST',
    })
    .then(async (response) => {
      const data: JSONResponse = await response.json();

      if (response.ok) {
        const { monthlyPayment } = data;

        if (!monthlyPayment) {
          return Promise.reject(new Error(`No monthly pyament"`));
        }

        const dollarsAndCents = monthlyPayment.split('.');

        return {
          dollars: +dollarsAndCents[0],
          cents: +dollarsAndCents[1],
        };
      } else {
        return Promise.reject(data.error);
      }
    });
}

export { fetchMortgage };
