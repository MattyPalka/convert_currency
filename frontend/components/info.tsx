import React from "react";

export const Info = () => {
  return (
    <div style={{ padding: "1rem", paddingTop: 0 }}>
      <p>
        This currency converter can calculate exchange any currency supported by{" "}
        <a
          href="https://nbp.pl/statystyka-i-sprawozdawczosc/kursy/"
          target="_blank"
          rel="noreferrer"
        >
          NBP
        </a>{" "}
        to PLN for any given day (if there is data for that day, therefore e.g.
        weekends and bank holidays are excluded)
      </p>
      <h4>
        Only rows where result column is empty will be converted. As we do not
        override any data
      </h4>
      <p>Keep this extension open for live conversion</p>
      <h4>
        If you change any cells (date, currency, value) after the row was
        converted, that is there is any data in the result column, remember to
        clear it so that we can recalculate the exchange.
      </h4>
      <span>
        The conversion is based on average daily exchange rate from{" "}
        <a
          href="https://nbp.pl/statystyka-i-sprawozdawczosc/kursy/"
          target="_blank"
          rel="noreferrer"
        >
          NBP
        </a>
      </span>
    </div>
  );
};
