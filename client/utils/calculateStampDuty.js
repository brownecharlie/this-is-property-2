export default function (price = 425000, buyToLet = false) {
  const stamp_1 = 125000;
  const stamp_2 = 250000;
  const stamp_3 = 925000;
  const stamp_4 = 1500000;
  let stampDuty;

  // calculates stamp less than 125k and buy to let
  if (price < stamp_1 && buyToLet) {
    stampDuty = price * 0.03 / price * 100;
  }

  // calculates stamp between 125k and 250k and buy to let
  else if (price > stamp_1 && price <= stamp_2 && buyToLet){
    stampDuty = ((price - stamp_1) * 0.05 + stamp_1 * 0.03) / (price) * 100;
  }

  // calculates stamp between 250k and 925k and buy to let
  else if (price > stamp_2 && price <= stamp_3 && buyToLet){
    stampDuty = (((price - stamp_2) * 0.08 + (stamp_2 - stamp_1) * 0.05 + stamp_1 * 0.03) / (price) * 100);
  }

  // calculates stamp between 925k and 1.5m and buy to let
  else if (price > stamp_3 && price <= stamp_4 && buyToLet){
    stampDuty = (((price - stamp_3) * 0.13 + (stamp_3 - stamp_2) * 0.08 + (stamp_2 - stamp_1) * 0.05 + stamp_1 * 0.03) / (price) * 100);
  }

  // calculates stamp between 925k and 1.5m and buy to let
  else if (price > stamp_4 && price > stamp_4 && buyToLet){
    stampDuty = (((price - stamp_4) * 0.15 + (stamp_4 - stamp_3) * 0.13 + (stamp_3 - stamp_2) * 0.08 + (stamp_2 - stamp_1) * 0.05 + stamp_1 * 0.03) / (price) * 100);
  }

  // calculates stamp lower than 125k
  else if (price < stamp_1){
    stampDuty = 0;
  }

  // calculates stamp between 125k and 250k
  else if (price > stamp_1 && price <= stamp_2){
    stampDuty = ((price - stamp_1) * 0.02 / price * 100);
  }

  // calculates stamp between 250k and 925k
  else if (price > stamp_2 && price <= stamp_3){
    stampDuty = (((price - stamp_2) * 0.05 + (stamp_2 - stamp_1) * 0.02) / (price) * 100);
  }

  // calculates stamp between 925k and 1.5m
  else if (price > stamp_3 && price <= stamp_4){
    stampDuty = ((price - stamp_3) * 0.10 + (stamp_3 - stamp_2) * 0.05 + (stamp_2 - stamp_1) * 0.02) / (price) * 100;
  }

  // calculates stamp between 925k and 1.5m
  else if (price > stamp_4 && price > stamp_4){
    stampDuty = ((price - stamp_4) * 0.12 + (stamp_4 - stamp_3) * 0.10 + (stamp_3 - stamp_2) * 0.05 + (stamp_2 - stamp_1) * 0.02) / (price) * 100;
  }

  return Math.round(stampDuty * 100) / 100;
}