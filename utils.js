const CorpWaterRate = 1;
const BoreWaterRate = 1.5;
const TankerWaterRate_lt500 = 2;
const TankerWaterCharge_lt500 = 1000;
const TankerWaterRate_501to1500 = 3;
const TankerWaterCharge_501to1500 = 3000;
const TankerWaterRate_1501to3000 = 5;
const TankerWaterCharge_1501to3000 = 7500;
const TankerWaterRate_gt3000 = 8;

const PeopleInApartment = [];
PeopleInApartment[2] = 3;
PeopleInApartment[3] = 5;

const Litre_Per_Person = 10;
const Days_In_Month = 30;

module.exports.calcuateAllottedCharge = (apartmentType, waterRatio) => {
  const allotedWaterConsumed =
    PeopleInApartment[apartmentType] * Litre_Per_Person * Days_In_Month;
  const CorpWaterPct = parseInt(waterRatio.split(":")[0]);
  const BoreWaterPct = parseInt(waterRatio.split(":")[1]);
  const CorpWaterCharge =
    (CorpWaterPct / (CorpWaterPct + BoreWaterPct)) *
    allotedWaterConsumed *
    CorpWaterRate;
  const BoreWaterCharge =
    (BoreWaterPct / (CorpWaterPct + BoreWaterPct)) *
    allotedWaterConsumed *
    BoreWaterRate;
  const allotedWaterCharge = CorpWaterCharge + BoreWaterCharge;
  return [allotedWaterConsumed, allotedWaterCharge];
};

module.exports.calcuateGuestCharge = (totalGuest) => {
  let guestWaterConsumed = totalGuest * Litre_Per_Person * Days_In_Month;
  let guestWaterCharge = 0;

  if (guestWaterConsumed > 3000) {
    guestWaterCharge =
      TankerWaterRate_gt3000 * (guestWaterConsumed - 3000) +
      TankerWaterCharge_1501to3000 +
      TankerWaterCharge_501to1500 +
      TankerWaterCharge_lt500;
  } else if (guestWaterConsumed > 1500) {
    guestWaterCharge =
      TankerWaterRate_1501to3000 * (guestWaterConsumed - 1500) +
      TankerWaterCharge_501to1500 +
      TankerWaterCharge_lt500;
  } else if (guestWaterConsumed > 500) {
    guestWaterCharge =
      TankerWaterRate_501to1500 * (guestWaterConsumed - 500) +
      TankerWaterCharge_lt500;
  } else {
    guestWaterCharge = TankerWaterRate_lt500 * guestWaterConsumed;
  }
  return [guestWaterConsumed, guestWaterCharge];
};
