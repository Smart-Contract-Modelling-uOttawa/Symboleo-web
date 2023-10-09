export const meatSaleContract = `//Example contract, visit Documentation to learn more
Domain meatSaleDomain
  Seller isA Role with returnAddress: String, name: String;
  Buyer isA Role with warehouse: String;
  Currency isAn Enumeration(CAD, USD, EUR);
  Meatquality isAn Enumeration(PRIME, AAA, AA, A);
  PerishableGood isAn Asset with quantity: Number, quality: MeatQuality;
  Meat isA PerishableGood;
  Delivered isAn Event with item: Meat, deliveryAddress: String, delDueDate: Date;
  Paid isAn Event with amount: Number, currency: Currency, from: Buyer, to: Seller, payDueDate: Date;
  PaidLate isAn Event with amount: Number, currency: Currency, from: Buyer, to: Seller;
  Disclosed isAn Event;

endDomain

Contract MeatSale (buyer : Buyer, seller : Seller, qnt : Number, qlt : MeatQuality, amt : Number, curr : Currency, payDueDate: Date, 
	delAdd : String, effDate : Date, delDueDateDays : Number, interestRate: Number
)

Declarations
  goods: Meat with quantity := qnt, quality := qlt;
  delivered: Delivered with item := goods, deliveryAddress := delAdd, delDueDate := Date.add(effDate, delDueDateDays, days);
  paidLate: PaidLate with amount := (1 + interestRate / 100) * amt, currency := curr, from := buyer, to := seller;
  paid: Paid with amount := amt, currency := curr, from := buyer, to := seller, payDueDate := payDueDate;
  disclosed: Disclosed;

Preconditions
  IsOwner(goods, seller);

Postconditions
  IsOwner(goods, buyer) and not(IsOwner(goods, seller));

Obligations
  delivery: Obligation(seller, buyer, true, WhappensBefore(delivered, delivered.delDueDate));
  payment: O(buyer, seller , true, WhappensBefore(paid, paid.payDueDate));
  latePayment: Happens(Violated(obligations.payment)) -> O(buyer, seller, true, Happens(paidLate));

//Surviving Obligations
//  so1 : Obligation(seller, buyer, true, not WhappensBefore(disclosed, Date.add(Activated(self), 6, months)));
//  so2 : Obligation(buyer, seller, true, not WhappensBefore(disclosed, Date.add(Activated(self), 6, months)));

Powers
  suspendDelivery : Happens(Violated(obligations.payment)) -> Power(seller, buyer, true, Suspended(obligations.delivery));
  resumeDelivery: HappensWithin(paidLate, Suspension(obligations.delivery)) -> P(buyer, seller, true, Resumed(obligations.delivery));
  terminateContract: Happens(Violated(obligations.delivery)) -> P(buyer, seller, true, Terminated(self));

Constraints
  not(IsEqual(buyer, seller));
  CannotBeAssigned(suspendDelivery);
  CannotBeAssigned(resumeDelivery);
  CannotBeAssigned(terminateContract);
  CannotBeAssigned(delivery);
  CannotBeAssigned(payment);
  CannotBeAssigned(latePayment);
  delivered.delDueDate < paid.payDueDate;

endContract`