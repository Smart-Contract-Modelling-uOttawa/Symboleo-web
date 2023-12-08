export const meatSaleContract = `// Example contract specified in Symboleo; visit the Documentation link to learn more.
// Once these five errors are fixed, the smart contract code will be generated automatically in the online VS Code editor!
// The smart contract code (for Hyperledger Fabric) can then be downloaded; visit the developer documentation in the SourceCode link to learn more.

// This is the domain model, which describes the concepts that subtype the Symboleo ontology
Domain meatSaleDomain
  Seller isA Role with returnAddress: String, name: String;
  Buyer isA Role with warehouse: String;
  Currency isAn Enumeration(CAD, USD, EUR);
  Meatquality isAn Enumeration(PRIME, AAA, AA, A);  // #1 There is an error here! Symboleo is case-sensitive; change the q to Q!
  PerishableGood isAn Asset with quantity: Number, quality: MeatQuality; // This error will disappear once the previous line is fixed
  Meat isA Asset; // #2 replace Asset with PerishableGood (an asset can extend another asset)
  Delivered isAn Event with item, deliveryAddress: String, delDueDate: Date; // #3 the type is missing; add ": Meat", and enjoy the auto-completion feature!
  Paid isAn Event with amount: Number, currency: Currency, from: Buyer, to: Seller, payDueDate: Date;
  PaidLate isAn Event with amount: Number, currency: Currency, from: Buyer, to: Seller;
  Disclosed isAn Event;

endDomain

// This is the contract signature, with the typed parameters required at contract instantiation time
Contract MeatSale (buyer : Buyer, seller : Seller, qnt : Number, qlt : MeatQuality, amt : Number, curr : Currency, payDueDate: Date, 
	delAdd : String, effDate : Date, delDueDateDays : Number, interestRate: Number
)

// These are local declarations for the contract.
Declarations
  goods: Meat with quantity := qnt, quality := qlt; // Will disappear once #2 is fixed
  delivered: Delivered with item := goods, deliveryAddress := delAdd, delDueDate := Date.add(effDate, delDueDateDays, days); // Will disappear once #3 is fixed
  paidLate: PaidLate with amount := (1 + interestRate / 100) * amt, currency := curr, from := buyer, to := seller;
  paid: Paid with amount := amt, currency := curr, from := buyer, to := seller, payDueDate := payDueDate;
  disclosed: Disclosed;

// Contracts can have pre- and post-conditions.
Preconditions
  IsOwner(goods, seller);

Postconditions
  IsOwner(goods, buyer) and not(IsOwner(goods, seller));

// Contracts are collections of obligations and powers
Obligations
  delivery: Obligation(seller, buyer, true, WhappensBefore(delivered, delivered.delDueDate));
  payment: O(buyer, seller , true, WhappensBefore(paid, paid.payDueDate)); // O() and Obligation() are equivalent (short and long form) 
  latePayment: Happens(Violated(obligations)) -> O(buyer, seller, true, Happens(paidLate)); // #4  add ".payment" after obligations, again with auto-completion

Powers
  suspendDelivery : Happens(Violated(obligations.payment)) -> Power(seller, buyer, true, Suspended(obligations.delivery));
  resumeDelivery: HappensWithin(paidLate, Suspension(obligations.delivery)) -> P(buyer, seller, true, Resumed(obligations.delivery)) // #5 add the missing ";" at the end!
  terminateContract: Happens(Violated(obligations.delivery)) -> P(buyer, seller, true, Terminated(self));  // P() and Power() are equivalent (short and long form)

// Additional constraints can also be specified for a contract.
Constraints
  not(IsEqual(buyer, seller));
  CannotBeAssigned(suspendDelivery);
  CannotBeAssigned(resumeDelivery);
  CannotBeAssigned(terminateContract);
  CannotBeAssigned(delivery);
  CannotBeAssigned(payment);
  CannotBeAssigned(latePayment);
  delivered.delDueDate < paid.payDueDate; // Will disappear once #2 is fixed

endContract`
