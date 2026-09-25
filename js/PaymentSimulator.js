const PAYMENT_DELAY_MS = 1000;

export class PaymentSimulator {
  process(plan) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          approved: true,
          message: "PAGO APROBADO",
          plan,
        });
      }, PAYMENT_DELAY_MS);
    });
  }
}
